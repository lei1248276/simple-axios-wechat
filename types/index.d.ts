import type { DefaultConfig, RequestConfig, Response, ResponseResult, InterceptorsHandler } from './types';
declare class SimpleAxios {
    defaults: DefaultConfig;
    interceptors: {
        request: Interceptors<Omit<RequestConfig, "header"> & {
            header: Record<string, any>;
        }>;
        response: Interceptors<Response<ResponseResult>>;
    };
    constructor(instanceConfig: DefaultConfig);
    request<TResult extends ResponseResult>(config: RequestConfig): Promise<Response<TResult>>;
    options<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<TResult>>;
    get<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<TResult>>;
    head<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<TResult>>;
    post<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<TResult>>;
    put<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<TResult>>;
    delete<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<TResult>>;
    trace<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<TResult>>;
    connect<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<TResult>>;
}
declare class Interceptors<TValue> {
    handlers: InterceptorsHandler<TValue>[];
    use(fulfilled?: InterceptorsHandler<TValue>['fulfilled'] | null, rejected?: InterceptorsHandler<TValue>['rejected'] | null): number;
    eject(index: number): void;
    clear(): void;
    forEach(fn: (handler: InterceptorsHandler<TValue>) => void): void;
}
interface SimpleAxiosInstance extends SimpleAxios {
    <TResult extends ResponseResult>(config: RequestConfig): Promise<Response<TResult>>;
    defaults: Omit<DefaultConfig, 'header'> & {
        header: Record<string, any>;
    };
}
interface SimpleAxiosStatic extends SimpleAxiosInstance {
    create(config?: DefaultConfig): SimpleAxiosInstance;
}
declare const simpleAxios: SimpleAxiosStatic;
export default simpleAxios;
