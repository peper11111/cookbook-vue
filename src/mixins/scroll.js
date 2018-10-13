import config from '@/config'
import requester from '@/mixins/requester'

export default {
  mixins: [ requester ],
  data () {
    return {
      done: false,
      items: [],
      page: 1
    }
  },
  created () {
    this.wrap(this.fetchItems)
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
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
        this.wrap(this.fetchItems)
      }
    }
  }
}
