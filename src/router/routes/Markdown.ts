import RouterView from '../../layouts/RouterView.vue'

export default {
  path: '/Markdown',
  name: 'Markdown',
  meta: { title: 'Markdown', icon: 'ContainerTwoTone' },
  component: RouterView,
  redirect: '/Unit',
  children: [
    {
      path: '/Unit',
      name: 'Unit',
      meta: { title: '库', icon: 'BookTwoTone' },
      component: () => import('@/views/Markdown/Unit/index.vue')
    },
  ]
}
