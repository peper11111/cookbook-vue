export default {
  data () {
    return {
      page: 1,
      done: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      if (this.fetching || this.done) {
        return
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        this.wrap(this.fetchRecipes, true)
      }
    }
  }
}
