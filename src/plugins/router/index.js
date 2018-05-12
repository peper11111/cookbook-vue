import Vue from 'vue'
import VueRouter from 'vue-router'
import api from '@/plugins/api'
import store from '@/plugins/store'
import { SET_AUTH } from '@/plugins/store/mutation-types'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  if (store.state.auth.loggedIn === null) {
    await api.auth.current().then(value => {
      store.commit(SET_AUTH, { loggedIn: true, currentUserId: value.data })
    }).catch(() => {
      store.commit(SET_AUTH, { loggedIn: false, currentUserId: null })
    })
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth.loggedIn) {
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
