type RequestOption = Parameters<typeof wx.request>[0]

type RequestTask = ReturnType<typeof wx.request>

export interface DefaultConfig extends Omit<RequestOption, 'url' | 'success' | 'fail' | 'complete'>{
  baseURL?: string
  adapter?: (config: RequestConfig) => Promise<any>
}

export interface RequestConfig extends Omit<RequestOption, 'success' | 'fail'>{
  baseURL?: string
  getRequestTask?: (task: RequestTask) => void
}

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
