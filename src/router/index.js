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
  if (store.state.auth.loggedIn === null) {
    await api.auth.check().then(() => {
      store.commit(SET_AUTH, { loggedIn: true })
    }).catch(() => {
      store.commit(SET_AUTH, { loggedIn: false })
    })
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth.loggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
