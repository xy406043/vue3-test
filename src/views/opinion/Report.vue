<template>
  <overview-header v-bind="allData" />
  <a-tabs type="card" style="margin-top: 30px" v-model:activeKey="choseViewType" size="small">
    <a-tab-pane key="sentimentAnalysis" tab="舆情分析">
      <overview-sentiment-item :sourceData="allData.report[choseViewType]" :reportId="allData.id" />
    </a-tab-pane>
    <a-tab-pane key="fansAnalysis" tab="作者粉丝量级分析">
      <overview-fans-item :sourceData="allData.report[choseViewType]" :reportId="allData.id" />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import ShareChart from '@/components/ShareChart';
import SplitLine from '@/components/SplitLine';
import OverviewHeader from './components/OverviewHeader.vue';
import SAlert from '../../components/SAlert/index';
import OverviewSentimentItem from './components/OverviewSentimentItem.vue';
import OverviewFansItem from './components/OverviewFansItem.vue';
import { OpinionService } from '@/api/opinion';

export default defineComponent({
  name: 'SearchResult',

  components: {
    OverviewHeader,
    ShareChart,
    SplitLine,
    SAlert,
    OverviewSentimentItem,
    OverviewFansItem,
  },

  props: {
    show: Boolean,
  },

  setup() {
    const route = useRoute();
    const allData = ref<any>({ report: {} });
    onBeforeMount(() => {
      OpinionService.searchAnalysisReport(route.params.id as string).then((res) => {
        allData.value = res;
      });
    });
    return { allData };
  },

  data() {
    return {
      choseViewType: 'sentimentAnalysis',
    };
  },

  methods: {
    handleSwitchData() {},
  },
});
</script>


<style lang="less" scoped>
:deep(.ant-tabs-bar) {
  margin-bottom: 0;
  border-bottom: 0;
}
</style>
