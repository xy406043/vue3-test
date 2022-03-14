import RouterView from '../../layouts/RouterView.vue'

export default {
  path: '/Algorithm',
  name: 'Algorithm',
  meta: { title: 'ALGORITHM', icon: 'EuroTwoTone' },
  component: RouterView,
  redirect: '/BaseAl',
  children: [
    {
      path: '/BaseAl',
      name: 'BaseAl',
      meta: { title: '一般问题', icon: 'ExperimentTwoTone' },
      component: () => import('@/views/Algorithm/Base/BaseAlgorithm.vue')
    }
  ]
}
