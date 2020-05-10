import { isPlainObject, isDate, isURLSearchParams } from './utils'

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

export function buildUrl(
  url: string,
  params?: any,
  paramsSerializer?: (params?: any) => string
): string {
  if (!params) {
    return url
  }

  let res = ''
  if (paramsSerializer) {
    res = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    res = params.toString()
  } else {
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
      else if (isPlainObject(val)) {
        keyValArray.push(`${enCode(key)}=${enCode(JSON.stringify(val))}`)
      } else {
        keyValArray.push(`${enCode(key)}=${enCode(val)}`)
      }
    })

    res = keyValArray.join('&')
  }

  // 除掉 hash
  let hashMark = url.indexOf('#')
  if (hashMark > -1) {
    url = url.substring(0, hashMark)
  }

  // ?
  let searchMark = url.includes('?')
  // console.log()
  return (url += (searchMark ? '&' : '?') + res)
}
