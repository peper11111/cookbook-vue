export default {
  create (file) {
    const formData = new FormData()
    formData.append('file', file)
    return this.http.post('/uploads', formData)
  }
}
