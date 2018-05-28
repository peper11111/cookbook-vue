export default {
  methods: {
    showInfo (message) {
      this.$store.commit('showMessage', { text: message, type: 'info' })
    },
    showError (message) {
      this.$store.commit('showMessage', { text: message, type: 'error' })
    },
    url (id) {
      return this.$api.uploads.url(id)
    }
  }
}
