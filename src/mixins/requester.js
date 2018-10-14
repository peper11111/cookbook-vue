export default {
  data () {
    return {
      pending: false
    }
  },
  methods: {
    wrap (request) {
      if (this.pending) {
        return
      }
      this.pending = true
      return request.finally(() => {
        this.pending = false
      })
    }
  }
}
