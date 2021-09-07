import type { Ref } from 'vue';
import type { InstAttr } from '@/types/monitoring';
import { onMounted, ref, reactive } from 'vue';
import { MonitoringService } from '@/api/monitoring';

export default function (options: any): {
  originList: Ref<InstAttr[]>;
  request: Function;
  loading: Ref<boolean>;
  isEmpty: Ref<boolean>;
  barData: any;
} {
  const loading = ref(false);
  const isEmpty = ref(false);
  const originList = ref<InstAttr[]>([]);
  const barData = ref<{ [key in string]: any }>({
    seriesData: [],
    yData: [],
    legendData: [],
  });

  async function request() {
    loading.value = true;
    const res = await MonitoringService.instOverview({
      days: options.days,
      heatType: options.heatType || null,
    }).finally(() => {
      loading.value = false;
    });
    const yData = res.map((item: any) => item.instName).reverse();
    barData.value.yData = yData;
    originList.value = res;
    isEmpty.value = res.length <= 0;
    barData.value.seriesData = transformToChartData(res);
    barData.value.legendData = reactive<string[]>(['正面笔记', '中性笔记', '负面笔记']);
  }

  // onMounted(request);

  return {
    request,
    loading,
    isEmpty,
    barData,
    originList,
  };
}

function transformToChartData(list: any[]): any {
  if (!list.length) return [];
  const seriesData: { [key in string]: any } = {
    negativeNum: {
      name: '负面笔记',
      type: 'bar',
      stack: 'total',
      sort: 3,
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
    neutralNum: {
      name: '中性笔记',
      type: 'bar',
      stack: 'total',
      sort: 2,
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
    positiveNum: {
      name: '正面笔记',
      type: 'bar',
      stack: 'total',
      sort: 1,
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [],
    },
  };
  const keys = Object.keys(seriesData);
  for (let i = 0, len = list.length; i < len; i++) {
    const target = list[i];
    keys.forEach((key) => {
      seriesData[key].data.unshift(target[key]);
    });
  }
  return Object.values(seriesData).reverse();
}
