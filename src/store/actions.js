import axios from 'axios'
import querystring from 'querystring'

const http = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true
})

http.interceptors.response.use((value) => Promise.resolve(value), (error) => {
  if (error.response.status === 401) {
    window.location.replace('/')
  }
  return Promise.reject(error)
})

export default {
  fetchCurrentUser (injectee) {
    return http.get('/current').then((value) => {
      injectee.commit('setCurrentUser', value.data.username)
    })
  },
  login (injectee, payload) {
    return http.post('/login', querystring.stringify(payload), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(() => {
      return injectee.dispatch('fetchCurrentUser')
    })
  },
  logout (injectee) {
    return http.post('/logout').then(() => {
      return injectee.dispatch('fetchCurrentUser')
    })
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
