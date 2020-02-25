import { isObject, isDate } from './utils'

// 保留部分 符号不转换
function enCode(param: string): string {
  return encodeURIComponent(param)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }

  let res = ''
  let keyValArray: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || val === undefined) {
      return
    }

    // bar = ['a','b']
    // is array
    // bar[]='a'&bar[]='b'
    if (Array.isArray(val)) {
      val.forEach(item => {
        keyValArray.push(`${enCode(key)}[]=${enCode(item)}`)
      })
    }

    // Date
    else if (isDate(val)) {
      keyValArray.push(`${enCode(key)}=${enCode(val.toISOString())}`)
    } // Object
    else if (isObject(val)) {
      keyValArray.push(`${enCode(key)}=${enCode(JSON.stringify(val))}`)
    }
  })

  res = keyValArray.join('&')

  // 除掉 hash
  let hashMark = url.indexOf('#')
  if (hashMark > -1) {
    url = url.substring(0, hashMark)
  }

  // ?
  let searchMark = url.includes('?')
  return (url = searchMark ? res : `?${res}`)
}
