import { createApp } from 'vue'
import App from './App.vue'
import setupGlobComps from './plugins'
import router from './router'
import { setupStore } from '/@/store'
import { setupI18n } from '/@/locales/setupI18n'
// import '/@/design/index.less'

async function bootstrap() {
  const app = createApp(App)

  app.config.performance = true

  setupStore(app)

  setupGlobComps(app)

  await setupI18n(app)

  app.use(router)

  app.mount('#app')
}

bootstrap()
