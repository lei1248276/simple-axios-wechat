import type { DefaultConfig, RequestConfig, Response, InterceptorsHandler } from './types';
declare class SimpleAxios {
    defaults: DefaultConfig | undefined;
    interceptors: {
        request: Interceptors<RequestConfig>;
        response: Interceptors<Response>;
    };
    constructor(instanceConfig?: DefaultConfig);
    request<T = Response>(config: RequestConfig): Promise<T>;
    options<T = Response>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<T>;
    get<T = Response>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<T>;
    head<T = Response>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<T>;
    post<T = Response>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<T>;
    put<T = Response>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<T>;
    delete<T = Response>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<T>;
    trace<T = Response>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<T>;
    connect<T = Response>(url?: string, config?: Omit<RequestConfig, 'url'>): Promise<T>;
}
declare class Interceptors<V> {
    handlers: InterceptorsHandler<V>[];
    use(fulfilled?: InterceptorsHandler<V>['fulfilled'] | null, rejected?: InterceptorsHandler<V>['rejected'] | null): number;
    eject(index: number): void;
    clear(): void;
    forEach(fn: (handler: InterceptorsHandler<V>) => void): void;
}
interface SimpleAxiosInstance extends SimpleAxios {
    <T = Response>(config: RequestConfig): Promise<T>;
    defaults: DefaultConfig;
    create(config?: DefaultConfig): SimpleAxiosInstance;
}
declare const simpleAxios: SimpleAxiosInstance;
export default simpleAxios;
