import { Methods, AxiosConfig, AxiosPromise } from '../interface'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(config: AxiosConfig): AxiosPromise {
    return dispatchRequest(config)
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
