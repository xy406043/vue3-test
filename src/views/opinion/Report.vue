<template>
  <OverviewHeader v-bind="allData" />
  <a-tabs
    type="card"
    style="margin-top: 30px"
    v-model:activeKey="choseViewType"
    size="small"
  >
    <a-tab-pane key="sentimentAnalysis" tab="舆情分析">
      <OverviewSentimentItem
        :sourceData="allData.report[choseViewType]"
        :reportId="allData.id"
      />
    </a-tab-pane>
    <a-tab-pane key="fansAnalysis" tab="作者粉丝量级分析">
      <OverviewFansItem
        :sourceData="allData.report[choseViewType]"
        :reportId="allData.id"
      />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
// ~~ 使用vue3 & volar需要注释掉vetur（可能还有其关联插件）,以避免冲突
import { defineComponent, ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import ShareChart from "@/components/ShareChart";
import SplitLine from "@/components/SplitLine";
import OverviewHeader from "./components/OverviewHeader.vue";
import OverviewSentimentItem from "./components/OverviewSentimentItem.vue";
import OverviewFansItem from "./components/OverviewFansItem.vue";
import { OpinionService } from "@/api/opinion";

const props = defineProps({
  show: Boolean,
});

const route = useRoute();
const allData = ref<any>({ report: {} });
onBeforeMount(() => {
  OpinionService.searchAnalysisReport(route.params.id as string).then((res) => {
    allData.value = res;
  });
});

const choseViewType = ref("sentimentAnalysis");
</script>

<style lang="less" scoped>
:deep(.ant-tabs-bar) {
  margin-bottom: 0;
  border-bottom: 0;
}
</style>
