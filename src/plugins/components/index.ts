import type { App } from 'vue'
// import VueSignaturePad from 'vue-signature-pad'
import XyTools from 'xy-vite-tools'

import SAlert from '@/components/SAlert/Index.vue'

export default function loadGlobalComps(app: App) {
  app.component('SAlert', SAlert)
  // app.use(VueSignaturePad)
  app.use(XyTools)
}
