import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import api from '../api'
import store from '../store'
import { SET_AUTH } from '../store/mutation-types'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(async (to, from, next) => {
  if (store.state.loggedIn === null) {
    await api.auth.current().then(value => {
      store.commit(SET_AUTH, { loggedIn: true, currentUser: value.data })
    }).catch(() => {
      store.commit(SET_AUTH, { loggedIn: false, currentUser: null })
    })
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.loggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath !== '/' ? to.fullPath : undefined }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
