import { AxiosConfig, AxiosPromise, AxiosResponse } from '../interface'

import { parseResponseHeaders } from '../helper/headers'
import createError from '../helper/error'
import { isSameOrigin, isFormData } from '../helper/utils'
import cookie from '../helper/cookie'

export default function xhr(config: AxiosConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'GET',
      params,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config
    const request = new XMLHttpRequest()

    // xhr 要将请求方法转为 大写
    request.open(method.toUpperCase(), url!, true)

    // 设置请求头
    // 此方法必须在  open() 方法和 send() 之间调用
    processHeader()

    processConfiguration()

    processEvent()

    function handleResponse(response: AxiosResponse): void {
      const { status } = response
      const validateStatus = response.config.validateStatus!
      // if (status >= 200 && status <= 300) {
      if (validateStatus(status)) {
        resolve(response)
      } else {
        reject(
          createError(`Request failed with status code ${status}`, config, null, request, response)
        )
      }
    }

    // header
    function processHeader() {
      if ((withCredentials || isSameOrigin(url!)) && xsrfCookieName) {
        const cookieValue = cookie.read(xsrfCookieName)
        if (cookieValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = cookieValue
        }
      }

      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processConfiguration() {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }

      // 取消
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }
    // 事件处理
    function processEvent() {
      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout exceeded ${timeout} ms`, config, 'ECONNABORTED', request))
      }

      request.onerror = function handleError() {
        reject(createError(`Network Error`, config, null, request))
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
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
    }

    request.send(data)
  })
}
