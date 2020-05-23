import Axios from './Axios'
import { extend } from '../helper/utils'
import { AxiosConfig, AxiosStatic } from '../interface'
import defaults from './defaults'
import mergeConfig from './mergeConfig'
import Cancel, { isCancel } from '../cancel/Cancel'
import CancelToken from '../cancel/CancelToken'

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

axios.isCancel = isCancel

axios.Cancel = Cancel

axios.CancelToken = CancelToken

axios.all = function(promises) {
  return Promise.all(promises)
}
axios.spread = function(cb) {
  return function(arr) {
    return cb.call(null, ...arr)
  }
}

axios.Axios = Axios

export default axios
