export default {
  data () {
    return {
      pending: false
    }
  },
  methods: {
    wrap (request, params) {
      if (this.pending) {
        return
      }
      this.pending = true
      return request(params).finally(() => {
        this.pending = false
      })
    }
  }
}
