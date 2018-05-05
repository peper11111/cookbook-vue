export default {
  get (id) {
    return this.http.get(`/user/${id}`)
  }
}
