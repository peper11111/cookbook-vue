import config from '@/config'
import requester from '@/mixins/requester'

export default {
  mixins: [ requester ],
  data () {
    return {
      done: null,
      items: null,
      page: null
    }
  },
  created () {
    this.init()
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    init () {
      this.done = false
      this.items = []
      this.page = 1
      this.wrap(this.fetchItems())
    },
    fetchItems () {
      return this.getFetchMethod().then((value) => {
        this.items.push(...value.data)
        if (value.data.length < config.pageSize) {
          this.done = true
        }
      })
    },
    onScroll () {
      if (this.pending || this.done) {
        return
      }
      if (this.$el.getBoundingClientRect().bottom <= window.innerHeight + 300) {
        this.wrap(this.fetchItems())
      }
    }
  }
}
