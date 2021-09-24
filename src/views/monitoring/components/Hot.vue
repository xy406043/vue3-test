<template>
  <share-chart
    :pieData="firstPieOptions"
    :lineData="firstLineOptions"
    :loading="loading"
    :empty="empty"
  />
  <s-alert title="笔记热词" style="margin-top: 40px" />
  <word-cloud-chart style="width: 300px; height: 300px" :list="hotWords" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue';
import ShareChart from '@/components/ShareChart';
import WordCloudChart from '@/components/Chart/Wordcloud';
import SplitLine from '@/components/SplitLine';
import useShareChartData from '@/hooks/useShareChartData';
import { NoteCategory } from '@/types/common';

export default defineComponent({
  components: {
    ShareChart,
    WordCloudChart,
    SplitLine,
  },
  props: {
    sourceData: {
      type: Object,
      default: () => ({}),
    },
    loading: Boolean,
  },
  setup(props) {
    const { sourceData } = toRefs(props);
    const empty = ref(false);
    const hotWords = ref([]);
    const firstPieOptions = reactive<any>({ title: '笔记热度分布' });
    const firstLineOptions = reactive<any>({
      title: '不同粉丝量级作者的笔记数量趋势',
      yName: '笔记数(个)',
    });

    watch(
      sourceData,
      (newVal) => {
        empty.value = !newVal;
        if (!newVal.heat) return;
        useShareChartData(
          firstPieOptions,
          firstLineOptions,
          newVal.heat.total,
          newVal.heat.byDayList,
          NoteCategory.Heat,
        );
        hotWords.value = newVal?.hotWords?.wordList || [];
      },
      {
        immediate: true,
      },
    );

    return {
      firstPieOptions,
      firstLineOptions,
      empty,
      hotWords,
    };
  },
});
</script>
