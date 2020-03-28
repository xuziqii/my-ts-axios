import axios from '../../src'

axios({
  method:'POST',
  url: '/post/base',
  data: {
    a: 1,
    b:2,
  },
})

axios({
  method:'POST',
  url: '/post/base',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json;'
  },
  data: {
    a: 4,
    b:3,
  },
})

const arr = new Int32Array([ 21, 22 ])
axios({
  method:'POST',
  url: '/post/buffer',
  data: arr,
  responseType: 'json',
}).then(res => {
  console.log(res)
})

const strParams = '?q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(strParams)

axios({
  method: 'POST',
  url: '/post/base',
  data: searchParams,
})

let formData = new FormData()
formData.append('code', '6234Chris')
formData.append('isMobile', 'false')

axios({
  method: 'POST',
  url: '/post/base',
  data: formData,
})
