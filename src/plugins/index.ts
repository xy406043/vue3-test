import type { App } from 'vue'
import loadGlobalComps from "./components/index.ts"
import loadAntdComps from './components/antd-vue'
import loadProLayoutComp from './components/pro-layout'
import loadIcons from './components/icon'
import loadEcharts from './components/echarts'

// 动画库
import { MotionPlugin } from '@vueuse/motion'
import { FcWaveFilter,FcBubbles } from 'fancy-components'

// 工具样式类 - 无需自己额外写样式了，在vite中编译也快
// https://cn.windicss.org/integrations/vite.html
import 'virtual:windi.css'

// css 样式库
import 'css-doodle';

/**
 * 批量注册组件
 * @param app
 */
export default function setupGlobComps(app: App) {
  loadGlobalComps(app)
  loadProLayoutComp(app)
  loadAntdComps(app)
  loadIcons(app)
  loadEcharts(app)

  // web components，vite config中完成配置可相当于HTML原生。
  // 此处相当于注册了全局组件
  new FcWaveFilter()
  new FcBubbles()

  // other plugins
  app.use(MotionPlugin)
}
