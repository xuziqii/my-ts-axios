import {
  Methods,
  AxiosConfig,
  AxiosPromise,
  AxiosResponse,
  ResolveFn,
  RejectFn
} from '../interface'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptor'
import mergeConfig from './mergeConfig'

interface AxiosInterceptor {
  request: InterceptorManager<AxiosConfig>
  response: InterceptorManager<AxiosResponse>
}
interface PromiseChain<T> {
  resolved: ResolveFn<T> | ((config: AxiosConfig) => AxiosPromise)
  rejected?: RejectFn
}

export default class Axios {
  interceptors: AxiosInterceptor
  defaults: AxiosConfig
  constructor(initConfig: AxiosConfig) {
    this.interceptors = {
      request: new InterceptorManager<AxiosConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
    this.defaults = initConfig
  }
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    let chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    // 遍历 执行 拦截器
    this.interceptors.request.getEach(interceptor => chain.unshift(interceptor))
    this.interceptors.response.getEach(interceptor => chain.push(interceptor))

    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise
  }

  get(url: string, config?: AxiosConfig): AxiosPromise {
    return this._handleUpdateConfigWithData('GET', url, config)
  }

  delete(url: string, config?: AxiosConfig): AxiosPromise {
    return this._handleUpdateConfigWithData('DELETE', url, config)
  }

  head(url: string, config?: AxiosConfig): AxiosPromise {
    return this._handleUpdateConfigWithData('HEAD', url, config)
  }

  options(url: string, config?: AxiosConfig): AxiosPromise {
    return this._handleUpdateConfigWithData('OPTIONS', url, config)
  }

  post(url: string, data?: any, config?: AxiosConfig): AxiosPromise {
    return this._handleUpdateConfigWithoutData('POST', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosConfig): AxiosPromise {
    return this._handleUpdateConfigWithoutData('PUT', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosConfig): AxiosPromise {
    return this._handleUpdateConfigWithoutData('PATCH', url, data, config)
  }

  _handleUpdateConfigWithData(method: Methods, url: string, config?: AxiosConfig): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _handleUpdateConfigWithoutData(
    method: Methods,
    url: string,
    data?: any,
    config?: AxiosConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
