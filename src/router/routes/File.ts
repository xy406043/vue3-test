import RouterView from '../../layouts/RouterView.vue'

export default {
  path: '/file',
  name: 'File',
  meta: { title: '文件', icon: 'CrownTwoTone' },
  component: RouterView,
  redirect: '/fileExport',
  children: [
    {
      path: '/fileExport',
      name: 'FileExport',
      meta: { title: 'Excel导出', icon: 'FolderOpenTwoTone' },
      component: () => import('@/views/File/Export/index.vue')
    },
    {
      path: '/fileUpload',
      name: 'FileUpload',
      meta: { title: '文件上传', icon: 'FolderAddTwoTone' },
      component: () => import('@/views/File/Upload/index.vue')
    },
    {
      path: '/fileUse',
      name: 'FileUse',
      meta: { title: '文件生成', icon: 'FolderTwoTone' },
      component: () => import('@/views/File/File/index.vue')
    },
    {
      path: '/fileImg',
      name: 'FileImg',
      meta: { title: '图片处理', icon: 'FileImageTwoTone' },
      component: () => import('@/views/File/Img/index.vue')
    },
  ]
}
