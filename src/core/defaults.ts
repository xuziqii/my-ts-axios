import { AxiosConfig } from '../interface'
import { transformRequestHeaders } from '../helper/headers'
import { transformRequestData } from '../helper/requestData'
import { transformResponseData } from '../helper/responseData'

const defaults: AxiosConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  // request.data =
  transformRequest: [
    function(data, headers) {
      transformRequestHeaders(headers, data)
      return transformRequestData(data)
    }
  ],
  // res.data =
  transformResponse: [
    function(data, headers) {
      return transformResponseData(data)
    }
  ],

  validateStatus: function(status) {
    if (status >= 200 && status <= 300) {
      return true
    }
    return false
  }
}

// 针对不同的方法 添加headers

const methodsWithData = ['put', 'post', 'patch']

const methodsWithoutData = ['options', 'get', 'head', 'delete']

methodsWithData.forEach(key => {
  defaults.headers[key] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

methodsWithoutData.forEach(key => {
  defaults.headers[key] = {}
})

export default defaults
