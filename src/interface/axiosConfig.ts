type Methods =
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

export default interface AxiosConfig {
  url: string
  method?: Methods
  data?: any
  params?: any
}
