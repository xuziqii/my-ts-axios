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
