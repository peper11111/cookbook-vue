import querystring from 'querystring'
import http from '../http'
import store from '../../plugins/store'
import { SET_CURRENT_USER } from '../../plugins/store/mutation-types'

class AuthService {
  fetchCurrentUser () {
    return http.get('/current').then((value) => {
      store.commit(SET_CURRENT_USER, value.data.username)
    })
  }

  login (username, password) {
    return http.post('/login', querystring.stringify({ username, password }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(this.fetchCurrentUser)
  }

  logout () {
    return http.post('/logout').then(this.fetchCurrentUser)
  }

  register (email, username, password) {
    return http.post('/register', { email, username, password })
  }

  verify (token) {
    return http.post('/verify', { token })
  }

  reset (username) {
    return http.post('/reset', { username })
  }

  confirm (password, token) {
    return http.post('/confirm', { password, token })
  }
}

export default new AuthService()
