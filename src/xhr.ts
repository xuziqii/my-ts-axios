import { AxiosConfig, AxiosPromise, AxiosResponse } from './interface'

import { parseResponseHeaders } from './helper/headers'
import createError from './helper/error'

export default function xhr(config: AxiosConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'GET', params, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()

    // xhr 要将请求方法转为 大写
    request.open(method.toUpperCase(), url!, true)

    // 设置请求头
    // 此方法必须在  open() 方法和 send() 之间调用
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout exceeded ${timeout} ms`, config, 'ECONNABORTED', request))
    }

    request.onerror = function handleError() {
      reject(createError(`Network Error`, config, null, request))
    }

    function handleResponse(response: AxiosResponse): void {
      const { status } = response
      if (status >= 200 && status <= 300) {
        resolve(response)
      }
      reject(
        createError(`Request failed with status code ${status}`, config, null, request, response)
      )
    }

    request.onreadystatechange = function handleStateChange() {
      if (request.status === 0) {
        return
      }
      if (request.readyState === 4) {
        const responseHeaders = parseResponseHeaders(request.getAllResponseHeaders())
        const responseData = responseType === 'text' ? request.responseText : request.response
        const responseStatus = request.status
        const responseStatusText = request.statusText
        const res: AxiosResponse = {
          data: responseData,
          status: responseStatus,
          statusText: responseStatusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(res)
      }
    }
    request.send(data)
  })
}
