export interface DefaultConfig<
  THeader extends Record<string, any> = Record<string, any>
> extends Omit<WechatMiniprogram.RequestOption, 'url' | 'success' | 'fail' | 'complete'>{
  baseURL?: string
  header?: THeader
  adapter?: (config: RequestConfig<THeader>) => Promise<Response<ResponseResult>>
}

export interface RequestConfig<
  THeader extends Record<string, any> = Record<string, any>
> extends Omit<WechatMiniprogram.RequestOption, 'success' | 'fail' | 'header'>{
  baseURL?: string
  header?: THeader
  getRequestTask?: (task: WechatMiniprogram.RequestTask) => void
}

// ! 接口返回的数据类型
export type ResponseResult = string | Record<string, any> | ArrayBuffer

export interface Response<TResult extends ResponseResult> extends WechatMiniprogram.RequestSuccessCallbackResult<TResult> {}

export interface InterceptorsHandler<TValue> {
  fulfilled: ((value: TValue) => TValue | Promise<TValue>) | null
  rejected: ((error: any) => any) | null
}
