export default {
  register (email, username, password) {
    return this.http.post('/auth/register', { email, username, password })
  },

  verify (token) {
    return this.http.post('/auth/verify', { token })
  },

  reset (username) {
    return this.http.post('/auth/reset', { username })
  },

  confirm (password, token) {
    return this.http.post('/auth/confirm', { password, token })
  }
}
