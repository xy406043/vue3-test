import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { clearPending } from '../utils/http'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { domTitle, setDocumentTitle } from '@/utils/tools'
import LocalStore from 'store2'
import { Routes } from './localRoutes'

const whiteList = ['UserLogin']
const loginRoutePath = '/user/login'

// 配置路由
const routes: RouteRecordRaw[] = Routes

const routerInstance = createRouter({
  history: createWebHistory(),
  routes: routes
})

routerInstance.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default routerInstance
