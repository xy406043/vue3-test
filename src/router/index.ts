import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
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
