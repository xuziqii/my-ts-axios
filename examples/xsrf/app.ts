import axios from '../../src'

const instance = axios.create({
  xsrfCookieName: 'xxx-cookie',
  xsrfHeaderName: 'xxx-token'
})

instance.get('/xsrf/get')
