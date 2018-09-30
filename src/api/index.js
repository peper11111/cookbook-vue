import Vue from 'vue'
import Api from '@/api/api'
import endpoints from '@/api/endpoints'

Vue.use(Api)

export default new Api({
  endpoints
})
