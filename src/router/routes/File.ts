import RouterView from '../../layouts/RouterView.vue'

export default {
  path: '/file',
  name: 'File',
  meta: { title: '测试比价', icon: 'CrownTwoTone' },
  component: RouterView,
  redirect: '/fileExport',
  children: [
    {
      path: '/fileExport',
      name: 'FileExport',
      meta: { title: '内容', icon: 'CrownTwoTone' },
      component: () => import('@/views/File/Export/index.vue')
    },
    {
      path: '/fileUpload',
      name: 'FileUpload',
      meta: { title: '内容', icon: 'CrownTwoTone' },
      component: () => import('@/views/File/Upload/index.vue')
    }
  ]
}
