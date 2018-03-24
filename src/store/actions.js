import axios from 'axios'
import querystring from 'querystring'

const http = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true
})

export default {
  login (injectee, payload) {
    return http.post('/login', querystring.stringify(payload), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  },
  logout (injectee) {
    return http.post('/logout')
  },
  registerUser (injectee, payload) {
    return http.post('/user/register', payload)
  },
  resetPassword (injectee, payload) {
    return http.post('/user/reset', payload)
  }
}
