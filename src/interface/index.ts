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
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  cancelToken?: CancelToken
  withCredentials?: boolean
  baseURL?: string
  paramsSerializer?: (params?: any) => string
  validateStatus?: (status: number) => boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string

  onDownloadProgress?: (event: ProgressEvent) => void
  onUploadProgress?: (event: ProgressEvent) => void

  auth?: AxiosAuth

  [propsName: string]: any
}

interface AxiosAuth {
  username: string
  password: string
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosConfig
  code?: string
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T = any>(config: AxiosConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>
  getUri: (config?: AxiosConfig) => string
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosConfig): AxiosPromise<T>
  <T = any>(url: any, config?: AxiosConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosConfig): AxiosInstance
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean

  all<T>(requests: Array<T | Promise<T>>): Promise<T[]>
  spread<T, R>(callBack: (...args: T[]) => R): (arr: T[]) => R
  Axios: AxiosClassStatic
}

interface AxiosClassStatic {
  new (config: AxiosConfig): Axios
}

export interface ResolveFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectFn {
  (error: any): any
}

// 拦截器
export interface Interceptor<T> {
  resolved: ResolveFn<T>
  rejected?: RejectFn
}

export interface AxiosInterceptorManager<T> {
  use(resolve: ResolveFn<T>, reject?: RejectFn): number
  eject(id: number): void
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}

// Canceler 取消函数 接口
export interface Canceler {
  (message?: string): void
}

export interface CancelTokenExecutor {
  (c: Canceler): void
}

export interface CancelTokenStatic {
  new (c: CancelTokenExecutor): CancelToken
  source(): CancelTokenSource
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

// Cancel 类 接口
export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}
