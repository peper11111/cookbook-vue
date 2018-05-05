import { SHOW_MESSAGE } from '../store/mutation-types'

export default {
  methods: {
    showInfo (message) {
      this.$store.commit(SHOW_MESSAGE, { text: message, type: 'info' })
    },
    showError (message) {
      this.$store.commit(SHOW_MESSAGE, { text: message, type: 'error' })
    },
    url (filename) {
      return `${this.$api.http.defaults.baseURL}/uploads/${filename}`
    }
  }
}
