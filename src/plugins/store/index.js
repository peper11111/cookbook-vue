import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/plugins/store/mutations'
import state from '@/plugins/store/state'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  state
})
