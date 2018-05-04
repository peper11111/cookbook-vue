import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import api from '../api'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    api.auth.check().then(() => {
      next()
    }).catch(() => {
      next({
        path: '/login',
        query: to.fullPath !== '/' ? { redirect: to.fullPath } : undefined
      })
    })
  } else {
    next()
  }
})

export default router
