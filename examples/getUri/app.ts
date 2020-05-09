import axios from '../../src'


const uri = axios.getUri({
  method: 'get',
  url: '/test/get1',
  baseUrl: 'http://fdvf/vvr////'
})

console.log(uri)
