import Vue from 'vue'
import Api from '@/api/api'
import modules from '@/api/modules'

Vue.use(Api)

export default new Api({
  modules
})
