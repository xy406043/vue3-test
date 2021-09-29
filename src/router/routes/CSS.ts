import RouterView from '../../layouts/RouterView.vue'

export default {
  path: '/css',
  name: 'Css',
  meta: { title: '效果', icon: 'FireTwoTone' },
  component: RouterView,
  redirect: '/library',
  children: [
    {
      path: '/library',
      name: 'Library',
      meta: { title: '库', icon: 'FolderTwoTone' },
      component: () => import('@/views/CSS/Library/index.vue')
    },
    {
      path: '/Canvas',
      name: 'Canvas',
      meta: { title: 'canvas', icon: 'FolderTwoTone' },
      component: RouterView,
      children: [
        {
          path: '/CanvasCanvas',
          name: 'CanvasCanvas',
          meta: { title: '滤镜', icon: 'FolderTwoTone' },
          component: () => import('@/views/CSS/Canvas/index.vue')
        },
        {
          path: '/handeWrite',
          name: 'handeWrite',
          meta: { title: '手写笔记', icon: 'FolderTwoTone' },
          component: () => import('@/views/CSS/Canvas/handwrite.vue')
        }
      ]
    },
    {
      path: '/CSS',
      name: 'CSS',
      meta: { title: 'CSS', icon: 'FolderTwoTone' },
      component: RouterView,
      children: [
        {
          path: '/Text',
          name: 'Text',
          meta: { title: '文字', icon: 'FolderTwoTone' },
          component: () => import('@/views/CSS/Css/text.vue')
        }
      ]
    }
  ]
}
