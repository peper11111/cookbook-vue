import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
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
