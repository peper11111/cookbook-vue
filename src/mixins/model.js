export default {
  created () {
    this.init()
  },
  watch: {
    model () {
      this.init()
    }
  },
  methods: {
    init () {
      const models = {}
      for (const key in this.models) {
        if (!this.models.hasOwnProperty(key)) {
          continue
        }
        models[key] = this.model[key]
      }
      this.models = models
    },
    getParams () {
      const params = {}
      for (const key in this.models) {
        if (!this.models.hasOwnProperty(key)) {
          continue
        }
        if (this.models[key]) {
          params[key] = this.models[key]
        }
      }
      return params
    },
    getUpdatedParams () {
      const params = {}
      for (const key in this.models) {
        if (!this.models.hasOwnProperty(key)) {
          continue
        }
        if (this.models[key] !== this.model[key]) {
          params[key] = this.models[key]
        }
      }
      return params
    }
  }
}
