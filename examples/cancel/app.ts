import axios, { Canceler } from '../../src'
import CancelToken from '../../src/cancel/CancelToken'

const cancelToken = axios.CancelToken
const source = cancelToken.source()

// token source
// axios({
//   method: 'get',
//   url: '/cancel/get',
//   cancelToken: source.token
// }).catch((e) => {
//   if (axios.isCancel(e)) {
//     console.log('canceled by user', e)
//   } else {
//     console.log(e)
//   }
// })

// setTimeout(() => {
//   source.cancel('request: /cancel/get')
// }, 300)


// // token 重复使用
// axios({
//   method: 'post',
//   url: '/cancel/post',
//   cancelToken: source.token,
//   data: {
//     a: 4,
//     b:3,
//   },
// }).catch(e => {
//   if (axios.isCancel(e)) {
//     console.log('canceled by reuse token', e)
//   } else {
//     console.log(e)
//   }
// })


// new token
let cancel:Canceler
axios({
  method: 'post',
  url: '/cancel/post',
  cancelToken: new CancelToken(function (c) {
    cancel = c
  }),
  data: {
    a: 4,
    b:3,
  },
}).catch(e => {
  if (axios.isCancel(e)) {
    console.log('canceled by user ', e)
  } else {
    console.log(e)
  }
})

setTimeout(() => {
  cancel('request: /cancel/post')
}, 1300)
// setTimeout(() => {
//   cancel('request: /cancel/post')
// }, 300)
