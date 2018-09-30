// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import moment from 'moment'
import Vue from 'vue'
import api from '@/api'
import config from '@/config'
import i18n from '@/i18n'
import notify from '@/notify'
import router from '@/router'
import store from '@/store'

import 'izitoast/dist/css/iziToast.css'
import '@/assets/styles/main.scss'

moment.locale(config.locale)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$notify = notify

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: {
    App: () => import('@/app')
  },
  template: '<App/>'
})
