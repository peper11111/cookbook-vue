export default function install (Vue) {
  Vue.mixin({
    beforeCreate () {
      const options = this.$options
      if (options.api) {
        this.$api = options.api
      } else if (options.parent && options.parent.$api) {
        this.$api = options.parent.$api
      }
    }
  })
}
