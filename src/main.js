// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/styles/main.scss'
import moment from 'moment'
import Vue from 'vue'
import api from '@/plugins/api'
import i18n from '@/plugins/i18n'
import router from '@/plugins/router'
import store from '@/plugins/store'

moment.locale('pl')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  api,
  i18n,
  router,
  store,
  components: {
    App: () => import('@/app')
  },
  template: '<App/>'
})
