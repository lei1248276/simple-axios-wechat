import type { DefaultConfig, RequestConfig, Response, ResponseResult, InterceptorsHandler } from './types';
declare class SimpleAxios {
    defaults: DefaultConfig;
    interceptors: {
        request: Interceptors<RequestConfig>;
        response: Interceptors<Response<ResponseResult>>;
    };
    constructor(instanceConfig: DefaultConfig);
    request<TResult extends ResponseResult>(config: RequestConfig): Promise<TResult>;
    options<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<TResult>;
    get<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<TResult>;
    head<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<TResult>;
    post<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<TResult>;
    put<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<TResult>;
    delete<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<TResult>;
    trace<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<TResult>;
    connect<TResult extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<TResult>;
}
declare class Interceptors<TValue> {
    handlers: InterceptorsHandler<TValue>[];
    use(fulfilled: InterceptorsHandler<TValue>['fulfilled'] | null, rejected: InterceptorsHandler<TValue>['rejected'] | null): number;
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
export declare const simpleAxios: SimpleAxiosStatic;
export default simpleAxios;
