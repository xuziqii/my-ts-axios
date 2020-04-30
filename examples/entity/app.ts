import axios, { AxiosConfig, AxiosResponse } from '../../src/index'

axios.interceptors.response.use(resolveResponse)
axios.interceptors.request.use(beforeRequest)

function beforeRequest (data: AxiosConfig) {
  console.log(data)
  return data
}
function resolveResponse (response: AxiosResponse) {
  console.log(response)
  return response
}

axios.get('/post/base')
