import axios from '../../src'
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
