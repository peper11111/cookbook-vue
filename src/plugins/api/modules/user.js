export default {
  get (id) {
    return this.http.get(`/users/${id}`)
  },

  update (id, data) {
    return this.http.put(`/users/${id}`, data)
  }
}
