import { AxiosTransformer } from '../interface'

export default function transform(
  data: any,
  headers: any,
  fns: AxiosTransformer | AxiosTransformer[]
): any {
  if (!data) {
    return
  }

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
