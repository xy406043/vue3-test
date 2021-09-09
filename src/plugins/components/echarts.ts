import { App } from 'vue';
import ECharts from 'vue-echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
// 注意，新的接口中默认不再包含 Canvas 渲染器，需要显示引入，如果需要使用 SVG 渲染模式则使用 SVGRenderer
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  PieChart,
  LineChart,
  GridComponent,
  CanvasRenderer,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
]);
export default (app: App) => {
  app.component('v-chart', ECharts);
};
