import Vue from 'vue'
import VueRouter from 'vue-router'
import ConfirmView from '../components/views/ConfirmView'
import FavoriteView from '../components/views/FavoriteView'
import HomeView from '../components/views/HomeView'
import LoginView from '../components/views/LoginView'
import ResetView from '../components/views/ResetView'
import ProfileView from '../components/views/ProfileView'
import RegisterView from '../components/views/RegisterView'
import VerifyView from '../components/views/VerifyView'
import auth from '../services/auth'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomeView, meta: { requiresAuth: true } },
    { path: '/favorite', component: FavoriteView, meta: { requiresAuth: true } },
    { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/reset', component: ResetView },
    { path: '/confirm', component: ConfirmView },
    { path: '/verify', component: VerifyView },
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
