import { AxiosConfig, AxiosPromise, AxiosResponse } from '../interface'
import xhr from './xhr'
import { flattenHeaders } from '../helper/headers'

import { buildUrl } from '../helper/buildUrl'
import transform from './transform'

export default function dispatchRequest(config: AxiosConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => processResponseData(res))
}

function processConfig(config: AxiosConfig): void {
  config.url = processUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest!)

  config.headers = flattenHeaders(config.headers, config.method)
}

export function processUrl(config: AxiosConfig): string {
  let { url, params, baseURL, paramsSerializer } = config
  url = processBaseUrl(url!, baseURL)
  return buildUrl(url!, params, paramsSerializer)
}

function processBaseUrl(url: string, baseURL?: string): string {
  if (baseURL && !isAbsoluteURL(url!)) {
    // url = baseURL.replace(/\/*$/, '') + '/' + url.replace(/^\/*/, '')
    url = combineURL(baseURL, url)
  }
  return url
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

function processResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.config.headers, res.config.transformResponse!)
  return res
}

function throwIfCancellationRequested(config: AxiosConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
