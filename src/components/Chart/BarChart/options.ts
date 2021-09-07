export default function (params: any) {
  return {
    yAxis: {
      type: 'category',
      data: params.yData,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    xAxis: {
      type: 'value',
      show: false,
    },
    grid: {
      top: 30,
      bottom: 30,
    },
    series: [
      {
        data: params.seriesData,
        type: 'bar',
        legendHoverLink: true, // 是否启用图列 hover 时的联动高亮
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'right', //在上方显示
            },
          },
        },
      },
    ],
  };
}
