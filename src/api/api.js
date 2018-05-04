function assert (condition, msg) {
  if (!condition) {
    throw new Error(('[api] ' + msg))
  }
}

export default class Api {
  constructor (options) {
    assert(options, 'Api configuration object is missing.')
    assert(options.http, '\'http\' option is missing in Api configuration object.')

    for (const module in options.modules) {
      this[module] = options.modules[module]
      this[module].$http = options.http
    }
  }

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
}
