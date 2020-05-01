import Axios from './Axios'
import { extend } from '../helper/utils'
import { AxiosConfig, AxiosStatic } from '../interface'
import defaults from './defaults'
import mergeConfig from './mergeConfig'

function createAxiosInstance(defaultConfig: AxiosConfig): AxiosStatic {
  const instance = new Axios(defaultConfig)
  let axios = Axios.prototype.request.bind(instance)
  axios = extend(axios, instance)
  return axios as AxiosStatic
}

const axios = createAxiosInstance(defaults)
axios.create = function(config) {
  return createAxiosInstance(mergeConfig(defaults, config))
}
export default axios
