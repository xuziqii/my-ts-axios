import Axios from './Axios'
import { extend } from '../helper/utils'
import { AxiosInstance } from '../interface'

export default function createAxiosInstance(): AxiosInstance {
  const instance = new Axios()
  let axios = Axios.prototype.request.bind(instance)
  axios = extend(axios, instance)
  return axios as AxiosInstance
}
