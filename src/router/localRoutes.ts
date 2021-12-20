import BasicLayout from '../layouts/BasicLayout.vue'
import UserLayout from '../layouts/UserLayout.vue'

import { BasicRoutes } from './routes/a_index'

import type { RouteRecordRaw } from 'vue-router'
export const Routes: RouteRecordRaw[] = [
  // 因 pro-layout 需要展示目录都需要放在这层级下，进行延展
  {
    path: '/',
    name: 'index',
    meta: { title: '' },
    component: BasicLayout,
    redirect: '/file',
    children: BasicRoutes
  }
]
