<template>
  <a-dropdown placement="bottomRight">
    <span class="ant-pro-account-avatar flex items-center">
      <a-avatar size="small" class="antd-pro-global-header-index-avatar">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <span>{{ userName }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu>
        <!-- <a-menu-item v-if="menu" key="settings" @click="handleExchangePW">
          <a-icon type="setting" />
          修改密码
        </a-menu-item>
        <a-menu-divider v-if="menu" /> -->
        <a-menu-item key="logout" @click="handleLogout">
          <LogoutOutlined />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Modal } from 'ant-design-vue';
import { UserActionTypes } from '@/store/modules/user/action-types';
import LocalStore from 'store2';

export default defineComponent({
  setup() {},

  computed: {
    userName() {
      const { phone = '' } = LocalStore.get('USER_INFO') || {};
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
  },

  methods: {
    handleLogout() {
      Modal.confirm({
        title: '消息',
        content: '你确定要退出登录吗？',
        onOk: () => {
          this.$store.dispatch(UserActionTypes.LOGOUT).then(() => {
            Modal.destroyAll();
            this.$router.push({ name: 'UserLogin' });
          });
        },
        onCancel() {},
      });
    },
  },
});
</script>

<style lang="less" scoped>
.ant-pro-account-avatar {
  padding: 0 12px;
  & > span {
    font-size: 15px !important;
    transform: none !important;
  }
}

.antd-pro-global-header-index-avatar {
  vertical-align: top;
  margin-right: 7px;
}
.ant-pro-drop-down {
  display: inline-block;
  height: 48px;
  line-height: 48px;
  vertical-align: top;
  cursor: pointer;
  :deep(.action) {
    margin-right: 8px;
  }
  :deep(.ant-dropdown-menu-item) {
    min-width: 160px;
  }
}
</style>
