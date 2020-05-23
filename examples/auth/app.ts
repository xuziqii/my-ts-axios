import axios from '../../src'

axios({
  url: '/auth/get',
  auth: {
    username: '123',
    password: 'abc'
  }
})
