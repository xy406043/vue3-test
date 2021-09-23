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

// routerInstance.beforeEach((to, from, next) => {
//   //在跳转路由之前，先清除所有的请求
//   clearPending()
//   to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`)
//   // NProgress.start();
//   const token = LocalStore('TOKEN')
//   if (token) {
//     if (to.path === loginRoutePath) {
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       next()
//     }
//   } else {
//     if (whiteList.includes(to.name as string)) {
//       // 在免登录白名单，直接进入
//       next()
//     } else {
//       next({ path: '/user/login' })
//       NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
//     }
//   }
// })

routerInstance.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default routerInstance
