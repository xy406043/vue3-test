<template>
  <overview-header :days="choseDay" @dayChange="onDayChange" v-bind="currentAnalysisData" />

  <a-card style="margin-top: 20px">
    <a-tabs v-model:activeKey="analysisType">
      <a-tab-pane key="heatAnalysis" tab="热度分析">
        <hot-panel :sourceData="currentAnalysisData['heatAnalysis']" :loading="loading" />
      </a-tab-pane>
      <a-tab-pane key="sentimentAnalysis" tab="舆情分析">
        <opinion-panel :sourceData="currentAnalysisData['sentimentAnalysis']" :loading="loading" />
      </a-tab-pane>
      <a-tab-pane key="fansAnalysis" tab="作者粉丝数量级分析">
        <fans-panel :sourceData="currentAnalysisData['fansAnalysis']" :loading="loading" />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import HotPanel from './components/Hot.vue';
import OpinionPanel from './components/Opinion.vue';
import OverviewHeader from './components/OverviewHeader.vue';
import FansPanel from './components/Fans.vue';
import { isEmptyObj } from '@/utils/tools';
import { message } from 'ant-design-vue';
import { MonitoringService } from '@/api/monitoring';

export default defineComponent({
  name: 'InstReport',

  components: {
    HotPanel,
    OpinionPanel,
    OverviewHeader,
    FansPanel,
  },

  props: {
    instAnalysisReport: {
      type: Object,
      default: () => ({}),
    },
  },

  setup() {
    const route = useRoute();
    const instAnalysisReport = ref<{ [index: number]: any }>({});
    const loading = ref(false);
    const choseDay = ref(90);
    const analysisType = ref('heatAnalysis');
    const currentAnalysisData = ref({
      heatAnalysis: {},
      sentimentAnalysis: {},
      fansAnalysis: {},
    });

    onBeforeMount(() => {
      // 获取机构信息
      MonitoringService.instAnalysisReport(route.params.id as string)
        .then((res) => {
          instAnalysisReport.value = res;
          if (route.query.defaultDay) {
            choseDay.value = Number(route.query.defaultDay);
          }
          const hasData = Object.values(res).some((item) => !isEmptyObj(item));
          if (hasData) {
            // todo
          } else {
            message.warning('未获取到该机构下的数据');
          }
        })
        .finally(() => {});
    });

    watch([instAnalysisReport, choseDay], ([newInst, newDay]) => {
      currentAnalysisData.value = newInst[newDay];
    });

    return {
      instAnalysisReport,
      analysisType,
      currentAnalysisData,
      choseDay,
      loading,
    };
  },

  methods: {
    onDayChange(day: number) {
      if (isEmptyObj(this.instAnalysisReport[day])) return message.error('尚未采集该选项下的信息');
      this.choseDay = day;
    },
  },
});
</script>
