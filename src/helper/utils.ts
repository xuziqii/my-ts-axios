export function isObject(obj: any): obj is Object {
  return obj != null && typeof obj === 'object'
}

export function isDate(date: Date): date is Date {
  return Object.prototype.toString.call(date) === '[object Date]'
}

export function isPlainObject(data: any): data is Object {
  return Object.prototype.toString.call(data) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}

export function deepMerge(...params: any[]): any {
  const res = Object.create(null)
  params.forEach(val => {
    if (val) {
      Object.keys(val).forEach(key => {
        const temp = val[key]
        if (isPlainObject(temp)) {
          if (isPlainObject(res[key])) {
            res[key] = deepMerge(res[key], temp)
          } else {
            res[key] = deepMerge(temp)
          }
        } else {
          res[key] = temp
        }
      })
    }
  })
  return res
}

export function isURLSearchParams(value: any): value is URLSearchParams {
  return value instanceof URLSearchParams
}
