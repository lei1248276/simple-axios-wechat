export interface DefaultConfig extends Omit<WechatMiniprogram.RequestOption, 'url' | 'success' | 'fail' | 'complete'>{
  baseURL?: string
  adapter?: (config: RequestConfig) => Promise<Response<string | Record<string, any> | ArrayBuffer>>
}

export interface RequestConfig extends Omit<WechatMiniprogram.RequestOption, 'success' | 'fail'>{
  baseURL?: string
  getRequestTask?: (task: WechatMiniprogram.RequestTask) => void
}

export interface Response<
  TResult extends string | Record<string, any> | ArrayBuffer
> extends WechatMiniprogram.RequestSuccessCallbackResult<TResult> {}

export interface InterceptorsHandler<TValue> {
  fulfilled: ((value: TValue) => string | Record<string, any> | ArrayBuffer) | null
  rejected: ((error: any) => any) | null
}
