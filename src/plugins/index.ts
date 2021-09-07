import type { App } from 'vue';
import loadAntdComps from './antd-vue';
import loadProLayoutComp from './pro-layout';
import loadIcons from './icon';
import loadEcharts from './echarts';

// 动画库
import { MotionPlugin } from '@vueuse/motion';

/**
 * 批量注册组件
 * @param app
 */
export default function setupGlobComps(app: App) {
  loadProLayoutComp(app);
  loadAntdComps(app);
  loadIcons(app);
  loadEcharts(app);

  // other plugins
  app.use(MotionPlugin);
}
