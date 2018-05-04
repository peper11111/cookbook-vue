import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../services/auth'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    auth.check().then(() => {
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
