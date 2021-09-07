import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import BasicLayout from '../layouts/BasicLayout.vue';
import BlankLayout from '../layouts/BlankLayout.vue';
import UserLayout from '../layouts/UserLayout.vue';
import { clearPending } from '../utils/http';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { domTitle, setDocumentTitle } from '@/utils/tools';
import LocalStore from 'store2';

const whiteList = ['UserLogin'];
const loginRoutePath = '/user/login';

const routes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    children: [
      {
        path: '/user/login',
        name: 'UserLogin',
        meta: { title: '登录' },
        component: () => import('@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'index',
    meta: { title: '' },
    component: BasicLayout,
    redirect: '/opinion',
    children: [
      {
        path: '/opinion',
        name: 'Opinion',
        meta: { title: '舆情监控', icon: 'RadarChartOutlined' },
        component: () => import('@/views/opinion/Overview.vue'),
      },
      {
        path: '/opinionReport/:id',
        name: 'OpinionReport',
        meta: { title: '舆情监控', icon: 'RadarChartOutlined', hideInMenu: true },
        component: () => import('@/views/opinion/Report.vue'),
      },
      {
        path: '/track',
        name: 'Track',
        meta: { title: '线索系统', icon: 'StockOutlined' },
        component: () => import('@/views/track/index.vue'),
      },
      {
        path: '/monitoring',
        name: 'Monitoring',
        meta: { title: '竞争对手监控', icon: 'LineChartOutlined' },
        component: () => import('@/views/monitoring/Overview.vue'),
      },
      {
        path: '/test',
        name: 'Test',
        meta: { title: 'wolaiTest', icon: 'woLai' },
        component: () => import('@/views/test/index.vue'),
      },
      {
        path: '/instReport/:id',
        name: 'InstReport',
        meta: { title: '机构报告', icon: 'LineChartOutlined', hideInMenu: true },
        component: () => import('@/views/monitoring/Report.vue'),
      },
    ],
  },
];

const routerInstance = createRouter({
  history: createWebHistory(),
  routes: routes,
});

routerInstance.beforeEach((to, from, next) => {
  //在跳转路由之前，先清除所有的请求
  clearPending();
  to.meta &&
    typeof to.meta.title !== 'undefined' &&
    setDocumentTitle(`${to.meta.title} - ${domTitle}`);
  // NProgress.start();
  const token = LocalStore('TOKEN');
  if (token) {
    if (to.path === loginRoutePath) {
      next({ path: '/' });
      NProgress.done();
    } else {
      next();
    }
  } else {
    if (whiteList.includes(to.name as string)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({ path: '/user/login' });
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

routerInstance.afterEach(() => {
  NProgress.done(); // finish progress bar
});

export default routerInstance;
