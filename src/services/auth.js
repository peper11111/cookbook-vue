import http from './http'
import router from '../router'
import store from '../store'
import * as types from '../store/mutation-types'

class AuthService {
  isLoggedIn () {
    return store.state.auth.loggedIn
  }

  login (username, password, redirect) {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    return http.post('/auth/login', formData).then(value => {
      store.commit(types.SHOW_INFO, value.data)
      store.commit(types.SET_AUTH, { loggedIn: true })
      router.push(redirect || '/')
      return value
    }).catch(error => {
      store.commit(types.SHOW_ERROR, error.response.data)
      return Promise.reject(error)
    })
  }

  logout () {
    return http.post('/auth/logout').then(value => {
      store.commit(types.SHOW_INFO, value.data)
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
      store.commit(types.SHOW_INFO, value.data)
      router.push('/login')
      return value
    }).catch(error => {
      store.commit(types.SHOW_ERROR, error.response.data)
      return Promise.reject(error)
    })
  }

  verify (token) {
    return http.post('/auth/verify', { token }).then(value => {
      store.commit(types.SHOW_INFO, value.data)
      router.push('/login')
      return value
    }).catch(error => {
      store.commit(types.SHOW_ERROR, error.response.data)
      router.push('/login')
      return Promise.reject(error)
    })
  }

  reset (username) {
    return http.post('/auth/reset', { username }).then(value => {
      store.commit(types.SHOW_INFO, value.data)
      router.push('/login')
      return value
    }).catch(error => {
      store.commit(types.SHOW_ERROR, error.response.data)
      return Promise.reject(error)
    })
  }

  confirm (password, token) {
    return http.post('/auth/confirm', { password, token }).then(value => {
      store.commit(types.SHOW_INFO, value.data)
      router.push('/login')
      return value
    }).catch(error => {
      store.commit(types.SHOW_ERROR, error.response.data)
      return Promise.reject(error)
    })
  }
}

export default new AuthService()
