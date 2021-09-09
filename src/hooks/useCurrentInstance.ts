import { ComponentInternalInstance, getCurrentInstance } from 'vue'

// 获取挂载到全局上的方法
export default function useCurrentInstance() {
  // ctx 只可用于开发测试，在生产环境无法使用，因此只使用proxy
  const { appContext, proxy } = getCurrentInstance() as ComponentInternalInstance

  const globalProperties = appContext.config.globalProperties

  return {
    globalProperties,
    proxy
  }
}
