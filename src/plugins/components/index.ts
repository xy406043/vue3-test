import type { App } from 'vue'

import SAlert from '@/components/SAlert/Index.vue'

export default function loadGlobalComps(app: App) {
  app.component('SAlert', SAlert)
}
