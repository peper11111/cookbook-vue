import axios from 'axios'
import querystring from 'querystring'

const http = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true
})

export default {
  login (injectee, payload) {
    return http.post('/login', querystring.stringify(payload), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  },
  logout () {
    return http.post('/logout')
  },
  register (injectee, payload) {
    return http.post('/register', payload)
  },
  verify (injectee, payload) {
    return http.post('/verify', payload)
  },
  reset (injectee, payload) {
    return http.post('/reset', payload)
  },
  confirm (injectee, payload) {
    return http.post('/confirm', payload)
  }
}
