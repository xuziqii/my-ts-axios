import AxiosConfig from './interface/axiosConfig'
import xhr from './xhr'

function axios(config: AxiosConfig): void {
  xhr(config)
}

export default axios
