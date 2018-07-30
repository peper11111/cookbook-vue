import { SHOW_MESSAGE } from '@/store/mutation-types'

export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    showInfo (message) {
      this.$store.commit(SHOW_MESSAGE, { text: message, type: 'info' })
    },
    showError (message) {
      this.$store.commit(SHOW_MESSAGE, { text: message, type: 'error' })
    },
    url (id) {
      return id ? this.$api.uploads.url(id) : null
    },
    fetch () {
      this.loading = true
      this.request().finally(() => {
        this.loading = false
      })
    }
  }
}
