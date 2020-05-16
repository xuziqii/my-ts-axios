import axios from '../../src'

const instance = axios.create({
  validateStatus: (status) => {
    if (400 > status && status >= 200) {
      return true
    }
    return false
  }
})

instance.get('/validateStatus/304')
