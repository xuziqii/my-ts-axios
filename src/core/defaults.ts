import { AxiosConfig } from '../interface'

const defaults: AxiosConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
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
