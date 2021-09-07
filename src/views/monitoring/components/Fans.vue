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
  <s-alert title="笔记热词" style="margin-top: 20px" />
  <word-cloud-chart :list="hotWords" style="width: 300px; height: 300px" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue';
import ShareChart from '@/components/ShareChart';
import WordCloudChart from '@/components/Chart/Wordcloud';
import SplitLine from '@/components/SplitLine/index';
import SRadioGroup from '@/components/SRadioGroup';
import SAlert from '@/components/SAlert/index';
import { isEmptyObj } from '@/utils/tools';
import useShareChartData from '@/hooks/useShareChartData';
import { NoteCategory } from '@/types/common';

const originNoteTypes4Tab = [
  {
    value: 'kol',
    label: 'KOL笔记',
  },
  {
    value: 'koc',
    label: 'KOC笔记',
  },
  {
    value: 'common',
    label: '素人笔记',
  },
];

export default defineComponent({
  name: 'FansPanel',
  components: {
    ShareChart,
    WordCloudChart,
    SplitLine,
    SRadioGroup,
    SAlert,
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
    const currentNoteType = ref('kol');
    const { sourceData } = toRefs(props);
    const currentNoteData = ref<any>({});
    const empty = ref(false);
    const hotWords = ref([]);
    const firstPieOptions = reactive<any>({ title: '舆情倾向分布' });
    const firstLineOptions = reactive<any>({
      title: '不同情感倾向的笔记数量趋势',
      yName: '笔记数(个)',
    });

    function getCategoryData(type: any) {
      if (!sourceData.value) return;
      currentNoteData.value = sourceData.value[type];
      hotWords.value = currentNoteData.value?.hotWords?.wordList || [];
    }

    watch(
      sourceData,
      (newVal) => {
        empty.value = isEmptyObj(newVal);
        if (empty.value) return;
        useShareChartData(
          firstPieOptions,
          firstLineOptions,
          newVal?.fans?.total,
          newVal?.fans?.byDayList,
          NoteCategory.FansNum,
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
      noteTypes4Tab,
    };
  },
});
</script>
