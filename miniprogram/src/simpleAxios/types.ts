export interface DefaultConfig{
  baseURL?: string
  header?: any
  timeout?: number
  adapter?: ((config: RequestConfig) => Promise<any>) | null
}

export type RequestConfig =
  Parameters<typeof wx.request>[0]
  & { getRequestTask?: (task: ReturnType<typeof wx.request>) => void }
  & DefaultConfig

export interface Response {
  data: any
  header: any
  errMsg: string
  statusCode: number
  statusText: string
}

export interface InterceptorsHandler<V> {
  fulfilled: ((value: V) => V | Promise<V>) | null
  rejected: ((error: any) => any) | null
}
