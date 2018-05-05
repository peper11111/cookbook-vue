export default {
  methods: {
    url (filename) {
      return `${this.$api.http.defaults.baseURL}/uploads/${filename}`
    }
  }
}
