import type { DefaultConfig, RequestConfig, Response, ResponseResult, InterceptorsHandler } from './types';
declare class SimpleAxios {
    defaults: DefaultConfig | undefined;
    interceptors: {
        request: Interceptors<RequestConfig>;
        response: Interceptors<Response<ResponseResult>>;
    };
    constructor(instanceConfig?: DefaultConfig);
    request<T extends ResponseResult>(config: RequestConfig): Promise<Response<T>>;
    options<T extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<T>>;
    get<T extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<T>>;
    head<T extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<T>>;
    post<T extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<T>>;
    put<T extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<T>>;
    delete<T extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<T>>;
    trace<T extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<T>>;
    connect<T extends ResponseResult>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<Response<T>>;
}
declare class Interceptors<V> {
    handlers: InterceptorsHandler<V>[];
    use(fulfilled?: InterceptorsHandler<V>['fulfilled'] | null, rejected?: InterceptorsHandler<V>['rejected'] | null): number;
    eject(index: number): void;
    clear(): void;
    forEach(fn: (handler: InterceptorsHandler<V>) => void): void;
}
interface SimpleAxiosInstance extends SimpleAxios {
    <T extends ResponseResult>(config: RequestConfig): Promise<Response<T>>;
    defaults: DefaultConfig & {
        header: Record<string, any>;
    };
}
interface SimpleAxiosStatic extends SimpleAxiosInstance {
    create(config?: DefaultConfig): SimpleAxiosInstance;
}
declare const simpleAxios: SimpleAxiosStatic;
export default simpleAxios;
