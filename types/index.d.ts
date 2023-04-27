import type { DefaultConfig, RequestConfig, Response, InterceptorsHandler } from './types';
declare class SimpleAxios {
    defaults: DefaultConfig;
    interceptors: {
        request: Interceptors<RequestConfig>;
        response: Interceptors<Response<string | Record<string, any> | ArrayBuffer>>;
    };
    constructor(instanceConfig: DefaultConfig);
    request<T extends string | Record<string, any> | ArrayBuffer, R = Response<T>>(config: RequestConfig): Promise<R>;
    options<T extends string | Record<string, any> | ArrayBuffer, R = Response<T>>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<R>;
    get<T extends string | Record<string, any> | ArrayBuffer, R = Response<T>>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<R>;
    head<T extends string | Record<string, any> | ArrayBuffer, R = Response<T>>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<R>;
    post<T extends string | Record<string, any> | ArrayBuffer, R = Response<T>>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<R>;
    put<T extends string | Record<string, any> | ArrayBuffer, R = Response<T>>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<R>;
    delete<T extends string | Record<string, any> | ArrayBuffer, R = Response<T>>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<R>;
    trace<T extends string | Record<string, any> | ArrayBuffer, R = Response<T>>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<R>;
    connect<T extends string | Record<string, any> | ArrayBuffer, R = Response<T>>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<R>;
}
declare class Interceptors<TValue> {
    handlers: InterceptorsHandler<TValue>[];
    use(fulfilled: InterceptorsHandler<TValue>['fulfilled'] | null, rejected: InterceptorsHandler<TValue>['rejected'] | null): number;
    eject(index: number): void;
    clear(): void;
    forEach(fn: (handler: InterceptorsHandler<TValue>) => void): void;
}
interface SimpleAxiosInstance extends SimpleAxios {
    <T extends string | Record<string, any> | ArrayBuffer, R = Response<T>>(config: RequestConfig): Promise<R>;
    defaults: Omit<DefaultConfig, 'header'> & {
        header: Record<string, any>;
    };
}
interface SimpleAxiosStatic extends SimpleAxiosInstance {
    create(config?: DefaultConfig): SimpleAxiosInstance;
}
export declare const simpleAxios: SimpleAxiosStatic;
export default simpleAxios;
