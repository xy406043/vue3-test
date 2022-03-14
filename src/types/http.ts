// 接口响应通过格式
export interface HttpResponse<T = any> {
  code: number
  desc: string
  result: T
  [key: string]: any
}
