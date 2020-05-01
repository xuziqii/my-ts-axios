import axios, { AxiosTransformer } from '../../src'
import qs from 'qs'

axios.defaults.headers.common['test_test'] = 3443

axios({
  method: 'post',
  url: '/config/post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: 'test'
  }
}).then((res) => {
  console.log(res)
})


// axios({
//   transformRequest: [
//     function (data) {
//       console.log(qs.stringify(data))
//       return qs.stringify(data)
//     },
//     ...(axios.defaults.transformRequest as AxiosTransformer[]),
//   ],

//   transformResponse: [
//     ...(axios.defaults.transformResponse as AxiosTransformer[]),
//     function (data) {
//       data.test = 9789789
//       return data
//     }
//   ],
//   method: 'post',
//   url: '/config/post',
//   data: {
//     a: 1
//   },
//   headers: {
//     test: 'test'
//   }
// }).then((res) => {
//   console.log(res)
// })
const instance = axios.create({
  transformRequest: [
    function (data) {
      console.log(qs.stringify(data))
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest as AxiosTransformer[]),
  ],

  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function (data) {
      data.test = 9789789
      return data
    }
  ],
  method: 'post',
  url: '/config/post',
  data: {
    a: 1
  },
  headers: {
    test: 'test'
  }
})
instance({
  method: 'post',
  url: '/config/post',
  data: {
    a: 1
  },
  headers: {
    test: 'test'
  }
}).then((res) => {
  console.log(res)
})
