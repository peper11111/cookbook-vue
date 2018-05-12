// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import api from './api'
import i18n from './i18n'
import router from './router'
import store from './store'

import './assets/styles/main.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  api,
  i18n,
  router,
  store,
  components: {
    App: () => import('./App')
  },
  template: '<App/>'
})
