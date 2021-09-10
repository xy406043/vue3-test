export default [
  {
    path: '/opinion',
    name: 'Opinion',
    meta: { title: '舆情监控', icon: 'RadarChartOutlined' },
    component: () => import('@/views/opinion/Overview.vue')
  },
  {
    path: '/opinionReport/:id',
    name: 'OpinionReport',
    meta: {
      title: '舆情监控',
      icon: 'RadarChartOutlined',
      hideInMenu: true
    },
    component: () => import('@/views/opinion/Report.vue')
  },
  {
    path: '/track',
    name: 'Track',
    meta: { title: '线索系统', icon: 'StockOutlined' },
    component: () => import('@/views/track/index.vue')
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
    meta: { title: '竞争对手监控', icon: 'LineChartOutlined' },
    component: () => import('@/views/monitoring/Overview.vue')
  },
  {
    path: '/instReport/:id',
    name: 'InstReport',
    meta: {
      title: '机构报告',
      icon: 'LineChartOutlined',
      hideInMenu: true
    },
    component: () => import('@/views/monitoring/Report.vue')
  }
]
