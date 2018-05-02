import querystring from 'querystring'
import http from './http'
import router from '../router'
import store from '../store'
import * as types from '../store/mutation-types'

class AuthService {
  isLoggedIn () {
    return store.state.auth.loggedIn
  }

  login (username, password, redirect) {
    return http.post('/auth/login', querystring.stringify({ username, password }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(value => {
      store.commit(types.SHOW_INFO, 'info.login-successful')
      store.commit(types.SET_AUTH, { loggedIn: true })
      router.push(redirect || '/')
      return value
    }).catch(error => {
      store.commit(types.SHOW_ERROR, 'error.login-incorrect')
      return Promise.reject(error)
    })
  }

  logout () {
    return http.post('/auth/logout').then(value => {
      store.commit(types.SET_AUTH, { loggedIn: false })
      router.push('/login')
      return value
    })
  }

  check () {
    return http.get('/auth/check').then(value => {
      store.commit(types.SET_AUTH, { loggedIn: true })
      return value
    }).catch(error => {
      store.commit(types.SET_AUTH, { loggedIn: false })
      return Promise.reject(error)
    })
  }

  register (email, username, password) {
    return http.post('/auth/register', { email, username, password }).then(value => {
      store.commit(types.SHOW_INFO, value.data.message)
      router.push('/login')
      return value
    }).catch(error => {
      store.commit(types.SHOW_ERROR, error.response.data.message)
      return Promise.reject(error)
    })
  }

  verify (token) {
    return http.post('/auth/verify', { token }).then(value => {
      store.commit(types.SHOW_INFO, value.data.message)
      router.push('/login')
      return value
    }).catch(error => {
      store.commit(types.SHOW_ERROR, error.response.data.message)
      return Promise.reject(error)
    })
  }

  reset (username) {
    return http.post('/auth/reset', { username }).then(value => {
      store.commit(types.SHOW_INFO, value.data.message)
      router.push('/login')
      return value
    }).catch(error => {
      store.commit(types.SHOW_ERROR, error.response.data.message)
      return Promise.reject(error)
    })
  }

  confirm (password, token) {
    return http.post('/auth/confirm', { password, token }).then(value => {
      store.commit(types.SHOW_INFO, value.data.message)
      router.push('/login')
      return value
    }).catch(error => {
      store.commit(types.SHOW_ERROR, error.response.data.message)
      return Promise.reject(error)
    })
  }
}

export default new AuthService()
