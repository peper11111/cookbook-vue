import config from '@/config'
import requester from '@/mixins/requester'

export default {
  mixins: [ requester ],
  props: {
    autoInit: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      done: true,
      items: [],
      page: 1,
      scrollParent: null
    }
  },
  created () {
    if (this.autoInit) {
      this.init()
    }
  },
  mounted () {
    this.scrollParent = this.getScrollParent(this.$el)
    this.scrollParent.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    this.scrollParent.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    getScrollParent (element) {
      if (!element || element === document.body) {
        return document.body
      }
      return this.isScrollable(element) ? element : this.getScrollParent(element.parentElement)
    },
    isScrollable (element) {
      const regex = /(auto|scroll)/
      const elementStyle = getComputedStyle(element)
      return regex.test(elementStyle.getPropertyValue('overflow')) ||
        regex.test(elementStyle.getPropertyValue('overflow-y')) ||
        regex.test(elementStyle.getPropertyValue('overflow-x'))
    },
    init () {
      this.done = false
      this.items = []
      this.page = 1
      this.fetchItems()
    },
    fetchItems () {
      this.wrap(() => {
        return this.getFetchMethod().then((value) => {
          this.done = value.data.length < config.pageSize
          this.items.push(...value.data)
          this.page++
        })
      })
    },
    onScroll () {
      if (this.pending || this.done) {
        return
      }
      const elRect = this.$el.getBoundingClientRect()
      const scrollParentRect = this.scrollParent.getBoundingClientRect()
      if (elRect.top + elRect.height <= scrollParentRect.top + scrollParentRect.height + 300) {
        this.fetchItems()
      }
    }
  }
}
