export default function (params: any) {
  const total = (params.seriesData || [])
    .map((item: any) => item.value)
    .reduce((a: any, b: any) => a + b, 0);
  return {
    title: {
      text: params.title,
      left: 'left',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      y: 'bottom',
      formatter: function (name: string) {
        const value = params.seriesData.find((item: any) => item.name === name)?.value || 0;
        return `${name}   ${value}    ${
          (total ? Math.round((value / total) * 10000) / 100.0 : '0') + '%'
        }`;
      },
    },

    series: [
      {
        name: '',
        type: 'pie',
        radius: '50%',
        center: ['45%', '40%'],
        data: params.seriesData,
        label: {
          normal: {
            formatter: '{b}（{c}，{d}%）',
            show: true,
          },
          // emphasis: {
          //   show: true,
          //   textStyle: {
          //     fontSize: '30',
          //     fontWeight: 'bold',
          //   },
          // },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
}
