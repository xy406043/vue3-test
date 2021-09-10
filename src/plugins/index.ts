import type { App } from 'vue'
import loadAntdComps from './components/antd-vue'
import loadProLayoutComp from './components/pro-layout'
import loadIcons from './components/icon'
import loadEcharts from './components/echarts'

// 动画库
import { MotionPlugin } from '@vueuse/motion'
 
// 工具样式 
// TODO放在这里能否生效
// https://cn.windicss.org/integrations/vite.html
import 'virtual:windi.css'

/**
 * 批量注册组件
 * @param app
 */
export default function setupGlobComps(app: App) {
  loadProLayoutComp(app)
  loadAntdComps(app)
  loadIcons(app)
  loadEcharts(app)

  // other plugins
  app.use(MotionPlugin)
}
