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
  defaults: DefaultConfig
  interceptors
  constructor(instanceConfig: DefaultConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: new Interceptors<RequestConfig>(),
      response: new Interceptors<Response<ResponseResult>>()
    }
  }

  request<TResult extends ResponseResult>(config: RequestConfig): Promise<TResult> {
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
    fulfilled: InterceptorsHandler<TValue>['fulfilled'] | null,
    rejected: InterceptorsHandler<TValue>['rejected'] | null
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

interface SimpleAxiosInstance extends SimpleAxios{
  <TResult extends ResponseResult>(config: RequestConfig): Promise<Response<TResult>>
  defaults: Omit<DefaultConfig, 'header'> & { header: Record<string, any> }
}

function createInstance(defaultConfig: DefaultConfig): SimpleAxiosInstance {
  const context = new SimpleAxios(defaultConfig)
  const instance = SimpleAxios.prototype.request.bind(context)

  return Object.assign(instance, extend(context, SimpleAxios.prototype)) as SimpleAxiosInstance
}

interface SimpleAxiosStatic extends SimpleAxiosInstance{
  create(config?: DefaultConfig): SimpleAxiosInstance
}

const globalDefaults: DefaultConfig = {
  baseURL: '',
  header: {}
}

export const simpleAxios: SimpleAxiosStatic = Object.assign(createInstance(globalDefaults), {
  create(instanceConfig?: DefaultConfig) {
    return createInstance({ ...globalDefaults, ...instanceConfig })
  }
})

export default simpleAxios
