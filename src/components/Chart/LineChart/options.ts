export default function (params: any) {
  let rotate = 0;
  if (params?.xData?.length >= 12) {
    rotate = 60;
  }
  return {
    title: {
      text: params.title,
    },
    legend: {
      data: params.legendData,
      left: 'right',
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    grid: {
      left: '5%',
      right: '4%',
      bottom: '5%',
      top: '20%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: params.xData,
      axisLabel: {
        show: true,
        rotate,
      },
    },
    yAxis: {
      type: 'value',
      name: params.yName,
      minInterval: 1,
    },
    series: params.seriesData,
  };
}
