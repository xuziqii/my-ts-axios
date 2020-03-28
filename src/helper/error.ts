import { AxiosConfig, AxiosPromise, AxiosResponse } from '../interface'

class AxiosError extends Error {
  isAxiosError: boolean
  message: string
  config: AxiosConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  constructor(
    message: string,
    config: AxiosConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.message = message
    this.config = config
    this.request = request
    this.isAxiosError = true
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export default function createError(
  message: string,
  config: AxiosConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  return new AxiosError(message, config, code, request, response)
}
