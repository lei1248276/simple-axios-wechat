import type {
  DefaultConfig,
  RequestConfig,
  Response,
  InterceptorsHandler
} from './types'
import {
  isExternal,
  extend
} from './utils'

class SimpleAxios {
  defaults: DefaultConfig | undefined
  interceptors
  constructor(instanceConfig?: DefaultConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: new Interceptors<RequestConfig>(),
      response: new Interceptors<Response>()
    }
  }

  request<T = Response>(config: RequestConfig): Promise<T> {
    config = { ...this.defaults, ...config }

    const chain: [
      ((value: any) => any | Promise<any>) | null,
      ((error: any) => any) | null
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

  options<T = Response>(url = '', config: Omit<RequestConfig, 'url'> = {}): Promise<T> {
    return this.request<T>({ method: 'OPTIONS', url, ...config })
  }

  get<T = Response>(url = '', config: Omit<RequestConfig, 'url'> = {}): Promise<T> {
    return this.request<T>({ method: 'GET', url, ...config })
  }

  head<T = Response>(url = '', config: Omit<RequestConfig, 'url'> = {}): Promise<T> {
    return this.request<T>({ method: 'HEAD', url, ...config })
  }

  post<T = Response>(url = '', config: Omit<RequestConfig, 'url'> = {}): Promise<T> {
    return this.request<T>({ method: 'POST', url, ...config })
  }

  put<T = Response>(url = '', config: Omit<RequestConfig, 'url'> = {}): Promise<T> {
    return this.request<T>({ method: 'PUT', url, ...config })
  }

  delete<T = Response>(url = '', config: Omit<RequestConfig, 'url'> = {}): Promise<T> {
    return this.request<T>({ method: 'DELETE', url, ...config })
  }

  trace<T = Response>(url = '', config: Omit<RequestConfig, 'url'> = {}): Promise<T> {
    return this.request<T>({ method: 'TRACE', url, ...config })
  }

  connect<T = Response>(url = '', config: Omit<RequestConfig, 'url'> = {}): Promise<T> {
    return this.request<T>({ method: 'CONNECT', url, ...config })
  }
}
class Interceptors<V> {
  handlers: InterceptorsHandler<V>[] = []

  use(
    fulfilled?: InterceptorsHandler<V>['fulfilled'] | null,
    rejected?: InterceptorsHandler<V>['rejected'] | null
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

  forEach(fn: (handler: InterceptorsHandler<V>) => void) {
    this.handlers.forEach((v) => { fn(v) })
  }
}

function dispatchRequest(config: RequestConfig): Promise<Response> {
  return new Promise((resolve, reject) => {
    const RequestTask = wx.request({
      ...config,
      url: isExternal(config.url) ? config.url : config.baseURL + config.url,
      success: (res: any) => {
        resolve(res)
      },
      fail: (err: any) => {
        reject(err)
      }
    })
    // ! 通过回调暴露RequestTask
    config.getRequestTask && config.getRequestTask(RequestTask)
  })
}

interface SimpleAxiosInstance extends SimpleAxios{
  <T = Response>(config: RequestConfig): Promise<T>
  defaults: DefaultConfig
  create(config?: DefaultConfig): SimpleAxiosInstance
}

function createInstance(defaultConfig: DefaultConfig): SimpleAxiosInstance {
  const context = new SimpleAxios(defaultConfig)
  const instance = SimpleAxios.prototype.request.bind(context) as SimpleAxiosInstance

  instance.create = function(instanceConfig?: DefaultConfig) {
    return createInstance({ ...defaultConfig, ...instanceConfig })
  }

  return Object.assign(instance, extend(context, SimpleAxios.prototype), context)
}

const defaults: DefaultConfig = {
  baseURL: '',
  header: {},
  adapter: null
}

const simpleAxios = createInstance(defaults)

export default simpleAxios
