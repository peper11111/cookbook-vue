import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/plugins/store'

Vue.use(VueRouter)

const ConfirmView = () => import('@/pages/ConfirmView')
const FavoriteView = () => import('@/pages/FavoriteView')
const HomeView = () => import('@/pages/HomeView')
const LoginView = () => import('@/pages/LoginView')
const NewRecipeView = () => import('@/pages/NewRecipeView')
const ProfileView = () => import('@/pages/ProfileView')
const RegisterView = () => import('@/pages/RegisterView')
const ResetView = () => import('@/pages/ResetView')
const VerifyView = () => import('@/pages/VerifyView')

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: HomeView, meta: { requiresAuth: true } },
    { path: '/favorite', component: FavoriteView, meta: { requiresAuth: true } },
    { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
    { path: '/new-recipe', component: NewRecipeView, meta: { requiresAuth: true } },
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
    if (!store.state.loggedIn) {
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
