export interface DefaultConfig extends Omit<WechatMiniprogram.RequestOption, 'url' | 'success' | 'fail' | 'complete'>{
  baseURL?: string
  adapter?: (config: RequestConfig) => Promise<Response<ResponseResult>>
}

export interface RequestConfig extends Omit<WechatMiniprogram.RequestOption, 'success' | 'fail'>{
  baseURL?: string
  getRequestTask?: (task: WechatMiniprogram.RequestTask) => void
}

// ! 接口返回的数据类型
export type ResponseResult = string | Record<string, any> | ArrayBuffer

export interface Response<T extends ResponseResult> extends WechatMiniprogram.RequestSuccessCallbackResult<T> {}

export interface InterceptorsHandler<V> {
  fulfilled: ((value: V) => V | Promise<V>) | null
  rejected: ((error: any) => any) | null
}
