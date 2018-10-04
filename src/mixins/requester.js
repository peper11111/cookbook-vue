export default {
  data () {
    return {
      fetching: false,
      loading: false
    }
  },
  methods: {
    wrap (request, quick = false) {
      const flag = quick ? 'fetching' : 'loading'
      if (this[flag]) {
        return
      }
      this[flag] = true
      request().finally(() => {
        this[flag] = false
      })
    }
  }
}
