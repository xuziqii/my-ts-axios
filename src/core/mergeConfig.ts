import { AxiosConfig } from '../interface'
import { deepMerge, isPlainObject } from '../helper/utils'

// 优先取 config2
function defaultStrategic(res1: any, res2: any) {
  return typeof res2 !== 'undefined' ? res2 : res1
}

// 只取 config2 的
function onlyFromConfig2Strategic(res1: any, res2: any) {
  if (res2) {
    return res2
  }
}

// 深拷贝的
function deepMergeStrategic(res1: any, res2: any) {
  if (isPlainObject(res2)) {
    return deepMerge(res1, res2)
  } else if (typeof res2 !== 'undefined') {
    return res2
  } else if (isPlainObject(res1)) {
    return deepMerge(res1)
  } else if (typeof res1 !== 'undefined') {
    return res1
  }
}

// 针对不同的属性做不同的合并策略
const strategicMap = Object.create(null)

// 只取 config2 的
const strategicKeysOnlyConfig2 = ['url', 'params', 'data']

strategicKeysOnlyConfig2.forEach(key => {
  strategicMap[key] = onlyFromConfig2Strategic
})

// deepMerge
const strategicKeysDeepMerge = ['headers']

strategicKeysDeepMerge.forEach(key => {
  strategicMap[key] = deepMergeStrategic
})

// 优先取 config2
// const strategicDefault = [ 'method', 'timeout' ]
// strategicDefault.forEach((key) => {
//   strategicMap[key] = defaultStrategic
// })
export default function mergeConfig(config1: AxiosConfig, config2?: AxiosConfig): AxiosConfig {
  if (!config2) {
    config2 = {}
  }
  let config = Object.create(null)

  Object.keys(config2).forEach(key => {
    mergeField(key)
  })

  Object.keys(config1).forEach(key => {
    if (config2![key] === undefined) {
      mergeField(key)
    }
  })

  function mergeField(key: string): void {
    const strategic = strategicMap[key] || defaultStrategic
    config[key] = strategic(config1[key], config2![key])
  }

  console.log(config)
  return config
}
