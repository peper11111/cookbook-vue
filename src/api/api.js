export default class Api {
  static install (Vue) {
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

  constructor (options) {
    for (const module in options.modules) {
      if (!options.modules.hasOwnProperty(module)) {
        continue
      }
      this[module] = options.modules[module]
    }
  }
}
