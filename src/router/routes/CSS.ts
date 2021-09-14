import RouterView from '../../layouts/RouterView.vue'

export default {
  path: '/css',
  name: 'Css',
  meta: { title: '样式', icon: 'FireTwoTone' },
  component: RouterView,
  redirect: '/library',
  children: [
    {
      path: '/library',
      name: 'Library',
      meta: { title: '库', icon: 'FolderTwoTone' },
      component: () => import('@/views/CSS/Library/index.vue')
    },
  ]
}
