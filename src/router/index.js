import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../services/auth'
import AppIntro from '../components/AppIntro'
import HomeView from '../components/views/HomeView'
import FavoriteView from '../components/views/FavoriteView'
import ProfileView from '../components/views/ProfileView'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomeView, meta: { requiresAuth: true } },
    { path: '/favorite', component: FavoriteView, meta: { requiresAuth: true } },
    { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
    { path: '/login', component: AppIntro },
    { path: '*', redirect: '/' }
  ]
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
