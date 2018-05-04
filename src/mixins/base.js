export default {
  methods: {
    url (filename) {
      return this.$api.upload.url(filename)
    }
  }
}
