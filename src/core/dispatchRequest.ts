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

function processUrl(config: AxiosConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
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
