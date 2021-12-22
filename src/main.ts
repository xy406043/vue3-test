import { createApp } from 'vue'
import App from './App.vue'
import setupGlobComps from './plugins'
import router from './router'
import store from './store'

const app = createApp(App)

// app.config.devtools = true
app.config.performance = true

setupGlobComps(app)

app.use(router)
app.use(store)

app.mount('#app')
