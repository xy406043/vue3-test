import { createApp } from 'vue'
import App from './App.vue'
import setupGlobComps from './plugins'
import router from './router'
import { setupStore } from '/@/store'

async function bootstrap() {
  const app = createApp(App)

  app.config.performance = true

  setupGlobComps(app)

  app.use(router)

  app.mount('#app')
}

bootstrap()
