<template>
  <a-card style="height: 100%" ref="el" :style="{ height: `${elHeight}px` }">
    <div class="flex flex-col justify-center items-center">
      <h1 class="title my-12">舆情监控</h1>
      <a-radio-group button-style="solid" size="large" v-model:value="searchDay">
        <a-radio-button :value="3">近3月</a-radio-button>
        <a-radio-button :value="6">近6月</a-radio-button>
        <a-radio-button :value="12">近12月</a-radio-button>
      </a-radio-group>
      <div class="flex justify-center my-6">
        <a-select
          :loading="reqInstLoading"
          placeholder="请选择医疗机构"
          size="large"
          style="margin-right: 8px; width: 200px"
          v-model:value="choseInst"
        >
          <a-select-option v-for="inst in instArr" :value="inst.id" :key="inst.id">
            {{ inst.name }}
          </a-select-option>
        </a-select>
        <a-auto-complete
          v-model:value="keyword"
          :dropdown-match-select-width="false"
          :dropdown-style="{ width: '500px' }"
          size="large"
          style="width: 500px"
          option-label-prop="value"
        >
          <template #options>
            <a-select-option v-for="(word, index) in defaultKeywords" :value="word" :key="index">
              {{ word }}
            </a-select-option>
          </template>
          <a-input placeholder="请输入查询关键词" size="large"> </a-input>
        </a-auto-complete>
        <a-button type="primary" size="large" style="margin-left: 8px" :loading="searching">
          <template #icon v-if="!searching"><SearchOutlined @click="onSearch" /></template>
        </a-button>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { OpinionService } from '@/api/opinion';
import { useSearchInstArr } from './hooks';
import { useMotions } from '@vueuse/motion';
import { notification } from 'ant-design-vue';
import { useResizeObserver } from '@vueuse/core';

export default defineComponent({
  name: 'OpinionSearch',

  components: {},

  setup() {
    const { params }: { params: any } = useRoute();
    const el = ref(null);
    const elHeight = ref(500);
    const searching = ref(false);
    const searchDay = ref<number>(params.days ? Number(params.days) : 3);
    const keyword = ref<string | undefined>(undefined);

    if (params.keyword) {
      keyword.value = params.keyword;
    }

    useResizeObserver(el, (entries: any) => {
      elHeight.value = entries[0].target.parentElement.clientHeight;
    });

    const motions = useMotions();

    // 搜索机构
    const { loading: reqInstLoading, instArr, choseInst } = useSearchInstArr(params.instId);

    async function onSearch() {
      if (!choseInst.value) return message.warning('请选择医疗机构');
      if (!keyword.value) return message.warning('请输入关键词');
      searching.value = true;
      const params = {
        days: searchDay.value,
        instId: choseInst.value,
        keyword: keyword.value,
      };
      await OpinionService.addTask(params).finally(() => {
        searching.value = false;
      });
      notification.success({
        message: '添加搜索任务',
        description: '提交搜索成功，请稍后于通知中心查看搜索结果',
      });
    }

    return {
      onSearch,
      choseInst,
      searching,
      motions,
      reqInstLoading,
      instArr,
      searchDay,
      keyword,
      el,
      elHeight,
    };
  },

  data() {
    return {
      defaultKeywords: [
        '下颌',
        '颌面',
        '颧骨',
        '下巴',
        '轮廓',
        '玻尿酸',
        '水光',
        '吸脂',
        '磨骨',
        '瘦脸',
      ],

      dataSource: [],
      value: '',
    };
  },
});
</script>

<style scoped>
.title {
  font-size: 30px;
  color: rgba(0, 0, 0, 0.85);
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}

:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
  border-right-width: 0px !important;
}
</style>>
