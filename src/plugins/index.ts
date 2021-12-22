import type { App } from 'vue'
import loadGlobalComps from './components/index'
import loadAntdComps from './components/antd-vue'
import loadProLayoutComp from './components/pro-layout'
import loadIcons from './components/icon'

// 动画库
import { MotionPlugin } from '@vueuse/motion'
import { FcWaveFilter, FcBubbles } from 'fancy-components'
// import 'ant-design-vue/dist/antd.css'

// css 样式库
import 'css-doodle'
import 'uno.css'
/**
 * 批量注册组件
 * @param app
 */
export default function setupGlobComps(app: App) {
  loadGlobalComps(app)
  loadProLayoutComp(app)
  loadAntdComps(app)
  loadIcons(app)

  // web components，vite config中完成配置可相当于HTML原生。
  // 此处相当于注册了全局组件
  new FcWaveFilter()
  new FcBubbles()

  // other plugins
  app.use(MotionPlugin)
}
