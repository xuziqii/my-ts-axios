import Axios from './Axios'
import { extend } from '../helper/utils'
import { AxiosInstance, AxiosConfig } from '../interface'
import defaults from './defaults'

function createAxiosInstance(defaultConfig: AxiosConfig): AxiosInstance {
  const instance = new Axios(defaultConfig)
  let axios = Axios.prototype.request.bind(instance)
  axios = extend(axios, instance)
  return axios as AxiosInstance
}

const axios = createAxiosInstance(defaults)
export default axios
