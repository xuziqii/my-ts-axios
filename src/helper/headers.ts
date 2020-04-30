import { isPlainObject, deepMerge } from './utils'

function normalizeHeadersKey(headers: any, normalizeKey: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(key => {
    if (key.toUpperCase() === normalizeKey.toUpperCase() && key !== normalizeKey) {
      headers[normalizeKey] = headers[key]
      delete headers[key]
    }
  })
}

export function transformRequestHeaders(headers: any, data: any): any {
  normalizeHeadersKey(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (!headers || !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseResponseHeaders(headers: string) {
  if (!headers) {
    return
  }
  let result = Object.create(null)
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }

    val = val.trim()
    result[key] = val
  })
  return result
}

export function flattenHeaders(headers: any, method: any): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common, headers[method], headers)
  const methodToDelete = ['common', 'post', 'patch', 'put', 'options', 'head', 'get', 'delete']
  methodToDelete.forEach(key => {
    delete headers[key]
  })
  return headers
}
