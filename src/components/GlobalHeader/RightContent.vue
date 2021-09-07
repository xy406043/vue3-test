<template>
  <div class="flex">
    <avatar-dropdown />
    <div :class="wrpCls" style="padding-right: 8px">
      <a-popover
        title="通知消息"
        placement="bottomRight"
        trigger="1"
        overlayClassName="msg"
        v-model:visible="msgVisible"
        :overlayStyle="{ width: '500px', height: '450px' }"
        :getPopupContainer="getPopupContainer"
      >
        <div style="padding: 0 20px" @click="handleMsgVisible" id="bellOutlined">
          <a-badge :count="unViewNum">
            <BellOutlined style="font-size: 21px" />
          </a-badge>
        </div>

        <template #content>
          <message-table :list="msgs" style="position: relative" />
        </template>
      </a-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageTable from './MessageTable.vue';
import { useMessageList } from '@/hooks/common';
import { timer, switchMap, retryWhen, delay, scan } from 'rxjs';
import { useObservable } from '@vueuse/rxjs';
import { OpinionService } from '../../api/opinion';
import { Popover } from 'ant-design-vue';
import AvatarDropdown from './AvatarDropdown.vue';

export default defineComponent({
  name: 'RightContent',
  components: {
    MessageTable,
    Popover,
    AvatarDropdown,
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action',
    },
    isMobile: {
      type: Boolean,
      default: () => false,
    },
    topMenu: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
    },
  },

  data() {
    return {
      showMenu: true,
      currentUser: {},
      msgVisible: false,
    };
  },

  computed: {
    wrpCls(): any {
      const { isMobile, topMenu, theme } = this;
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${isMobile || !topMenu ? 'light' : theme}`]: true,
      };
    },
  },

  setup() {
    const { request: requestMsgList, loading: requestMsgLoading, list: msgs } = useMessageList();

    // 轮询获取未读消息
    const LOOP_TIME = 2000;
    const TRY_TIMES = 3;
    const unViewNum = useObservable(
      timer(0, LOOP_TIME).pipe(
        switchMap(OpinionService.unViewNum),
        retryWhen((err$) =>
          err$.pipe(
            scan((errCount, err) => {
              if (errCount >= TRY_TIMES) {
                throw err;
              }
              return errCount + 1;
            }, 0),
            delay(LOOP_TIME),
          ),
        ),
      ),
    );

    return {
      requestMsgList,
      requestMsgLoading,
      msgs,
      unViewNum,
    };
  },

  methods: {
    async handleMsgVisible() {
      if (this.msgVisible) {
        this.msgVisible = false;
        return;
      }
      if (this.requestMsgLoading) return;
      await this.requestMsgList();
      this.msgVisible = true;
    },

    getPopupContainer(triggerNode: HTMLElement) {
      return triggerNode.parentNode || document.body;
    },
  },
});
</script>

<style>
.msg .ant-popover-inner-content {
  padding: 5px 0px 0px 0px;
}
</style>
