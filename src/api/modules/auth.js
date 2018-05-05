export default {
  login (username, password) {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    return this.http.post('/auth/login', formData)
  },

  logout () {
    return this.http.post('/auth/logout')
  },

  current () {
    return this.http.get('/auth/current')
  },

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
