import axios from '../../src/index'

document.cookie = 'a=b'

axios.get('/credentials/get').then(res => {
  console.log(res)
})

axios.post('http://127.0.0.1:8088/credentials/server2', { }, {
  withCredentials: true
}).then(res => {
  console.log(res)
})
