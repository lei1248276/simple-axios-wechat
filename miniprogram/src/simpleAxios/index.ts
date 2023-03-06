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

class SimpleAxios {
  defaults: DefaultConfig | undefined
  interceptors
  constructor(instanceConfig?: DefaultConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: new Interceptors<RequestConfig>(),
      response: new Interceptors<Response<ResponseResult>>()
    }
  }

  request<T extends ResponseResult>(config: RequestConfig): Promise<Response<T>> {
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

  options<T extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T>({ method: 'OPTIONS', url, ...config })
  }

  get<T extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T>({ method: 'GET', url, ...config })
  }

  head<T extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T>({ method: 'HEAD', url, ...config })
  }

  post<T extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T>({ method: 'POST', url, ...config })
  }

  put<T extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T>({ method: 'PUT', url, ...config })
  }

  delete<T extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T>({ method: 'DELETE', url, ...config })
  }

  trace<T extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T>({ method: 'TRACE', url, ...config })
  }

  connect<T extends ResponseResult>(url = '', config: Omit<RequestConfig, 'url'> = {}) {
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

interface SimpleAxiosInstance extends SimpleAxios{
  <T extends ResponseResult>(config: RequestConfig): Promise<Response<T>>
  defaults: DefaultConfig & { header: Record<string, any>}
}

function createInstance(defaultConfig: DefaultConfig): SimpleAxiosInstance {
  const context = new SimpleAxios(defaultConfig)
  const instance = SimpleAxios.prototype.request.bind(context)

  return Object.assign(instance, extend(context, SimpleAxios.prototype)) as SimpleAxiosInstance
}

interface SimpleAxiosStatic extends SimpleAxiosInstance{
  create(config?: DefaultConfig): SimpleAxiosInstance
}

const defaults: DefaultConfig = {
  baseURL: '',
  header: {}
}

const simpleAxios: SimpleAxiosStatic = Object.assign(createInstance(defaults), {
  create(instanceConfig?: DefaultConfig) {
    return createInstance({ ...defaults, ...instanceConfig })
  }
})

export default simpleAxios
