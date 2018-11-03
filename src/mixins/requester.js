export default {
  data () {
    return {
      pending: false
    }
  },
  methods: {
    wrap (request) {
      if (this.pending) {
        return Promise.reject(new Error('Request already pending'))
      }
      this.pending = true
      return request().finally(() => {
        this.pending = false
      })
    }
  }
}
