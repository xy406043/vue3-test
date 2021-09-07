<template>
  <a-card>
    <div class="flex justify-between items-center">
      <h1 style="margin: 0; font-size: 18px">竞争对手概览</h1>
      <a-radio-group button-style="solid" v-model:value="searchOptions.heatType">
        <a-radio-button :value="heatLevelType.ALL">全部笔记</a-radio-button>
        <a-radio-button :value="heatLevelType.Fei">沸(1w-10w)</a-radio-button>
        <a-radio-button :value="heatLevelType.Re">热(1w-10w)</a-radio-button>
        <a-radio-button :value="heatLevelType.Wen">温(1000以下)</a-radio-button>
      </a-radio-group>
    </div>
    <div class="flex justify-end">
      <a-select style="width: 115px; margin-top: 20px" v-model:value="searchOptions.days">
        <a-select-option :value="3">近3月</a-select-option>
        <a-select-option :value="6">近6月</a-select-option>
        <a-select-option :value="12">近12月</a-select-option>
      </a-select>
    </div>
    <div style="width: 100%; height: 400px; margin-top: 50px">
      <stacked-h-bar
        style="width: 100%; height: 400px"
        :barData="barData"
        @clickLabel="switchToResult"
        :loading="loading"
        ref="stackedHBar"
      />
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import StackedHBar from '@/components/Chart/StackedHBar';
import { HeatLevelType } from '@/types/monitoring';
import { useSearchOverviewData } from './hooks';
import { MonitoringService } from '@/api/monitoring';
import { message } from 'ant-design-vue';
import { isEmptyObj } from '@/utils/tools';

export default defineComponent({
  name: 'Monitoring',
  components: {
    StackedHBar,
  },

  setup() {
    const stackedHBar = ref<InstanceType<typeof StackedHBar>>();
    const searchOptions = reactive({
      days: 3,
      heatType: HeatLevelType.ALL,
    });
    const heatLevelType = reactive(HeatLevelType);
    const reportLoading = ref(false);

    const {
      request: requestOverviewData,
      loading,
      isEmpty,
      barData,
      originList,
    } = useSearchOverviewData(searchOptions);

    watch(
      searchOptions,
      async () => {
        await requestOverviewData();
        stackedHBar.value?.render();
      },
      {
        immediate: true,
      },
    );

    return {
      heatLevelType,
      searchOptions,
      loading,
      isEmpty,
      barData,
      originList,
      reportLoading,
      stackedHBar,
    };
  },

  data() {
    return {
      instId: '-1',
    };
  },

  methods: {
    switchToResult(e: { value: string }) {
      this.instId = this.originList.find((item) => item.instName === e.value)!.instId;
      const hide = message.loading('获取数据中，请稍后...');
      MonitoringService.instAnalysisReport(this.instId)
        .then((res) => {
          const hasData = Object.values(res).some((item) => !isEmptyObj(item));
          if (hasData) {
            window.open(`/instReport/${this.instId}?defaultDay=${this.searchOptions.days}`);
          } else {
            message.warning('未获取到该机构下的数据');
          }
        })
        .finally(() => {
          hide();
        });
    },
  },
});
</script>
