import { AxiosConfig, AxiosPromise, AxiosResponse } from '../interface'
import xhr from '../xhr'

import { buildUrl } from '../helper/buildUrl'
import { transformRequestData } from '../helper/requestData'
import { transformRequestHeaders } from '../helper/headers'
import { transformResponseData } from '../helper/responseData'

export default function dispatchRequest(config: AxiosConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => processResponseData(res))
}

function processConfig(config: AxiosConfig): void {
  config.url = processUrl(config)
  config.headers = processRequestHeaders(config)
  config.data = processRequestData(config)
}

function processUrl(config: AxiosConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}
function processRequestData(config: AxiosConfig): any {
  const { data } = config
  return transformRequestData(data)
}

function processRequestHeaders(config: AxiosConfig): any {
  const { headers = {}, data } = config
  return transformRequestHeaders(headers, data)
}

function processResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponseData(res.data)
  return res
}
