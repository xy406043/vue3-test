<template>
  <share-chart
    :pieData="firstPieOptions"
    :lineData="firstLineOptions"
    :loading="loading"
    :empty="empty"
  />
  <split-line />
  <s-radio-group
    v-model:value="currentNoteType"
    :options="noteTypes4Tab"
    style="margin-bottom: 40px"
  />
  <share-chart
    :pieData="secondPieOptions"
    :lineData="secondLineOptions"
    :loading="loading"
    :empty="empty"
  />
  <s-alert title="笔记热词" style="margin-top: 20px" />
  <word-cloud-chart :list="hotWords" style="width: 300px; height: 300px" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue';
import ShareChart from '@/components/ShareChart';
import WordCloudChart from '@/components/Chart/Wordcloud';
import SplitLine from '@/components/SplitLine/index';
import SRadioGroup from '@/components/SRadioGroup';
import { isEmptyObj } from '@/utils/tools';
import useShareChartData from '@/hooks/useShareChartData';
import { NoteCategory } from '@/types/common';

const originNoteTypes4Tab = [
  {
    value: 'positive',
    label: '正面笔记',
  },
  {
    value: 'neutral',
    label: '中性笔记',
  },
  {
    value: 'negative',
    label: '负面笔记',
  },
];

export default defineComponent({
  components: {
    ShareChart,
    WordCloudChart,
    SplitLine,
    SRadioGroup,
  },

  props: {
    sourceData: {
      type: Object,
      default: () => ({}),
    },
    loading: Boolean,
  },

  setup(props) {
    const noteTypes4Tab = reactive(originNoteTypes4Tab);
    const currentNoteType = ref('positive');
    const { sourceData } = toRefs(props);
    const currentNoteData = ref<any>({});
    const empty = ref(false);
    const hotWords = ref([]);
    const firstPieOptions = reactive<any>({ title: '舆情倾向分布' });
    const firstLineOptions = reactive<any>({
      title: '不同情感倾向的笔记数量趋势',
      yName: '笔记数(个)',
    });
    const secondPieOptions = reactive<any>({ title: '笔记热度分布' });
    const secondLineOptions = reactive<any>({
      title: '不同热度的笔记数量趋势',
      yName: '笔记数(个)',
    });

    function getCategoryData(type: any) {
      if (!sourceData.value) return;
      currentNoteData.value = sourceData.value[type];
      useShareChartData(
        secondPieOptions,
        secondLineOptions,
        currentNoteData.value?.heat?.total,
        currentNoteData.value?.heat?.byDayList,
        NoteCategory.Heat,
      );
      hotWords.value = currentNoteData.value?.hotWords?.wordList || [];
      const currentNoteCn = originNoteTypes4Tab.find(
        (item) => item.value === currentNoteType.value,
      )?.label;
      secondPieOptions.title = `${currentNoteCn}热度分布`;
      secondLineOptions.title = `不同热度的${currentNoteCn}数量趋势`;
    }

    watch(
      sourceData,
      (newVal) => {
        empty.value = isEmptyObj(newVal);
        if (empty.value) return;
        useShareChartData(
          firstPieOptions,
          firstLineOptions,
          newVal?.sentiment?.total,
          newVal?.sentiment?.byDayList,
          NoteCategory.Emotion,
        );
        getCategoryData(currentNoteType.value);
      },
      {
        immediate: true,
      },
    );

    watch(currentNoteType, getCategoryData);

    return {
      firstPieOptions,
      firstLineOptions,
      empty,
      hotWords,
      currentNoteType,
      currentNoteData,
      secondPieOptions,
      secondLineOptions,
      noteTypes4Tab,
    };
  },
});
</script>
