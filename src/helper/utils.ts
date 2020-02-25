export function isObject(obj: any): obj is Object {
  return obj != null && typeof obj === 'object'
}

export function isDate(date: Date): date is Date {
  return Object.prototype.toString.call(date) === '[object Date]'
}
