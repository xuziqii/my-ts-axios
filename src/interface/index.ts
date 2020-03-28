export type Methods =
  | 'get'
  | 'put'
  | 'delete'
  | 'options'
  | 'post'
  | 'head'
  | 'patch'
  | 'GET'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'POST'
  | 'HEAD'
  | 'PATCH'

export interface AxiosConfig {
  url?: string
  method?: Methods
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  request(config: AxiosConfig): AxiosPromise
  get(url: string, config?: AxiosConfig): AxiosPromise
  delete(url: string, config?: AxiosConfig): AxiosPromise
  head(url: string, config?: AxiosConfig): AxiosPromise
  options(url: string, config?: AxiosConfig): AxiosPromise
  post(url: string, data?: any, config?: AxiosConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosConfig): AxiosPromise
}
