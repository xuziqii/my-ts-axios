import axios from '../../src'


const uri = axios.getUri({
  method: 'get',
  url: '/test/get1?a=b',
  baseURL: 'http://fdvf/vvr',
  params: new URLSearchParams('q=URLUtils.searchParams&topic=api')
})

console.log(uri)
