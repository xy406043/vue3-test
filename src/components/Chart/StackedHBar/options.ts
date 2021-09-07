export default function (params: any) {
  params.seriesData.forEach((item: any) => {
    const label = {
      normal: {
        show: true,
        formatter: function (params: any) {
          if (params.value > 0) {
            return params.value;
          } else {
            return '';
          }
        },
      },
    };
    item.label = label;
  });
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      data: params.legendData,
      left: '6%',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      triggerEvent: true,
      axisLabel: {
        show: true,
        clickable: true,
        textStyle: {
          fontSize: 13,
          color: '#1890ff',
        },
      },

      data: params.yData,
    },
    series: params.seriesData,
  };
}
