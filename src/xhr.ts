import AxiosConfig from './interface/axiosConfig'

export default function xhr(config: AxiosConfig): void {
  const { data = null, url, method = 'GET', params } = config
  const request = new XMLHttpRequest()
  // xhr 要将请求方法转为 大写
  request.open(method.toUpperCase(), url, true)
  request.send()
}
