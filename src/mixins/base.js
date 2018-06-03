export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    showInfo (message) {
      this.$store.commit('showMessage', { text: message, type: 'info' })
    },
    showError (message) {
      this.$store.commit('showMessage', { text: message, type: 'error' })
    },
    url (id) {
      return this.$api.uploads.url(id)
    },
    fetch () {
      this.loading = true
      this.request().finally(() => {
        this.loading = false
      })
    }
  }
}
