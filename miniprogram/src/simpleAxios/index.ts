import type {
  DefaultConfig,
  RequestConfig,
  Response,
  ResponseResult,
  InterceptorsHandler
} from './types'
import {
  isExternal,
  extend
} from './utils'

class SimpleAxios<THeader extends Record<string, any>> {
  defaults: DefaultConfig
  interceptors
  constructor(instanceConfig: DefaultConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: new Interceptors<RequestConfig<THeader>>(),
      response: new Interceptors<Response<ResponseResult>>()
    }
  }

  request<TResult extends ResponseResult>(config: RequestConfig): Promise<Response<TResult>> {
    config = { ...this.defaults, ...config }
    config.url = isExternal(config.url) ? config.url : config.baseURL + config.url

    const chain: [
      InterceptorsHandler<any>['fulfilled'] | null,
      InterceptorsHandler<any>['rejected'] | null
    ] = [this.defaults?.adapter || dispatchRequest, null]

    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })

    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected)
    })

    let promise: Promise<any> = Promise.resolve(config)
    let i = 0
    while (i < chain.length) {
      promise = promise.then(chain[i++], chain[i++])
    }

    return promise
  }

  options<TResult extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<TResult>({ method: 'OPTIONS', url, ...config })
  }

  get<TResult extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<TResult>({ method: 'GET', url, ...config })
  }

  head<TResult extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<TResult>({ method: 'HEAD', url, ...config })
  }

  post<TResult extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<TResult>({ method: 'POST', url, ...config })
  }

  put<TResult extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<TResult>({ method: 'PUT', url, ...config })
  }

  delete<TResult extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<TResult>({ method: 'DELETE', url, ...config })
  }

  trace<TResult extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<TResult>({ method: 'TRACE', url, ...config })
  }

  connect<TResult extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<TResult>({ method: 'CONNECT', url, ...config })
  }
}
class Interceptors<TValue> {
  handlers: InterceptorsHandler<TValue>[] = []

  use(
    fulfilled?: InterceptorsHandler<TValue>['fulfilled'] | null,
    rejected?: InterceptorsHandler<TValue>['rejected'] | null
  ) {
    this.handlers.push({ fulfilled: fulfilled || null, rejected: rejected || null })

    return this.handlers.length - 1
  }

  eject(index: number) {
    this.handlers[index] = { fulfilled: null, rejected: null }
  }

  clear() {
    this.handlers = []
  }

  forEach(fn: (handler: InterceptorsHandler<TValue>) => void) {
    this.handlers.forEach((v) => { fn(v) })
  }
}

function dispatchRequest(config: RequestConfig): Promise<Response<ResponseResult>> {
  return new Promise((resolve, reject) => {
    const RequestTask = wx.request({
      ...config,
      success: (res) => { resolve(res) },
      fail: (err) => { reject(err) }
    })
    // ! 通过回调暴露RequestTask
    config.getRequestTask && config.getRequestTask(RequestTask)
  })
}

interface SimpleAxiosInstance<THeader extends Record<string, any>> extends SimpleAxios<THeader>{
  <TResult extends ResponseResult>(config: RequestConfig): Promise<Response<TResult>>
  defaults: Omit<DefaultConfig, 'header'> & { header: Record<string, any>}
}

function createInstance<THeader extends Record<string, any>>(defaultConfig: THeader): SimpleAxiosInstance<THeader> {
  const context = new SimpleAxios<THeader>(defaultConfig)
  const instance = SimpleAxios.prototype.request.bind(context)

  return Object.assign(instance, extend(context, SimpleAxios.prototype)) as SimpleAxiosInstance<THeader>
}

interface SimpleAxiosStatic extends SimpleAxiosInstance<Record<string, any>>{
  create<THeader extends Record<string, any>>(config?: DefaultConfig<THeader>): SimpleAxiosInstance<THeader>
}

const globalDefaults: DefaultConfig = {
  baseURL: '',
  header: {}
}

const simpleAxios: SimpleAxiosStatic = Object.assign(createInstance(globalDefaults), {
  create<THeader extends Record<string, any>>(instanceConfig?: DefaultConfig<THeader>) {
    return createInstance<THeader>({ ...globalDefaults, ...instanceConfig } as THeader)
  }
})

export default simpleAxios
