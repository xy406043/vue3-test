import { reactive, ref } from 'vue';
import { NoteCategory } from '@/types/common';

const NoteCategory2Cn: { [key in number]: any } = {
  [NoteCategory.Emotion]: {
    positiveNum: {
      name: '正面笔记',
      sort: 1,
    },
    neutralNum: {
      name: '中性笔记',
      sort: 2,
    },
    negativeNum: {
      name: '负面笔记',
      sort: 3,
    },
  },
  [NoteCategory.FansNum]: {
    commonNum: {
      name: '素人笔记',
      sort: 3,
    },
    kocNum: {
      name: 'KOC笔记',
      sort: 2,
    },
    kolNum: {
      name: 'KOL笔记',
      sort: 1,
    },
  },
  [NoteCategory.Heat]: {
    level1Num: {
      name: '温(1000以下)',
      sort: 1,
    },
    level2Num: {
      name: '热(1000-1w)',
      sort: 2,
    },
    level3Num: {
      name: '沸(1w-10w)',
      sort: 3,
    },
  },
};

function useSharePieData(data: { [key in string]: string }, mapKey: NoteCategory) {
  if (!data) return [];
  const categoryCn = NoteCategory2Cn[mapKey];
  let list: any[] = [];
  for (const key in data) {
    list.push({ name: categoryCn[key].name, value: data[key], sort: categoryCn[key].sort });
  }
  list.sort((a, b) => a.sort - b.sort);
  const seriesData = reactive(list);

  return seriesData;
}

function useShareLineData(data: any[], mapKey: NoteCategory) {
  let xData = ref<string[]>([]);
  const seriesData = ref<any[]>([]);
  const legendData = ref<any[]>([]);
  if (!data) return { seriesData, xData, legendData };
  const categoryCn = NoteCategory2Cn[mapKey];
  let keys = Object.keys(categoryCn);
  let key4Data: { [key in string]: any } = {};
  keys.forEach((key: string) => {
    key4Data[key] = {
      name: categoryCn[key].name,
      type: 'line',
      smooth: true,
      data: [],
      sort: categoryCn[key].sort,
    };
  });
  data.forEach((item) => {
    xData.value.push(item.date);

    for (const key in item) {
      if (keys.includes(key)) {
        key4Data[key].data.push(item[key]);
      }
    }
  });
  seriesData.value = Object.values(key4Data).sort((a, b) => a.sort - b.sort);
  legendData.value = Object.values(categoryCn);
  return { seriesData, xData, legendData };
}

/**
 * 获取组图的配置
 * @param pieOptions 组图中的饼图配置
 * @param lineOptions 组图中的折线图配置
 * @param total 饼图数据
 * @param byDayList 折线图数据
 * @param type 笔记所属分类
 */
export default function useShareChartData(
  pieOptions: any,
  lineOptions: any,
  total: any,
  byDayList: any[],
  type: NoteCategory,
) {
  pieOptions.seriesData = useSharePieData(total, type);
  const { seriesData, xData } = useShareLineData(byDayList, type);
  lineOptions.seriesData = seriesData;
  lineOptions.xData = xData;
}
