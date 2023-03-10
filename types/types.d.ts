export interface DefaultConfig extends Omit<WechatMiniprogram.RequestOption, 'url' | 'success' | 'fail' | 'complete'> {
    baseURL?: string;
    adapter?: (config: RequestConfig) => Promise<Response<ResponseResult>>;
}
export interface RequestConfig extends Omit<WechatMiniprogram.RequestOption, 'success' | 'fail'> {
    baseURL?: string;
    getRequestTask?: (task: WechatMiniprogram.RequestTask) => void;
}
export type ResponseResult = string | Record<string, any> | ArrayBuffer;
export interface Response<TResult extends ResponseResult> extends WechatMiniprogram.RequestSuccessCallbackResult<TResult> {
}
export interface InterceptorsHandler<TValue> {
    fulfilled: ((value: TValue) => TValue | Promise<TValue>) | null;
    rejected: ((error: any) => any) | null;
}
