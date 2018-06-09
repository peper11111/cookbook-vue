import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/plugins/store'

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/pages/home-page'),
      meta: { requiresAuth: true }
    },
    {
      path: '/favorite',
      component: () => import('@/pages/favorite-page'),
      meta: { requiresAuth: true }
    },
    {
      path: '/cookbook',
      component: () => import('@/pages/cookbook-page'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:id',
      component: () => import('@/pages/user-page'),
      meta: { requiresAuth: true }
    },
    {
      path: '/new-recipe',
      component: () => import('@/pages/new-recipe-page'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: () => import('@/pages/login-page')
    },
    {
      path: '/register',
      component: () => import('@/pages/register-page')
    },
    {
      path: '/reset',
      component: () => import('@/pages/reset-page')
    },
    {
      path: '/confirm',
      component: () => import('@/pages/confirm-page')
    },
    {
      path: '/verify',
      component: () => import('@/pages/verify-page')
    },
    {
      path: '*',
      redirect: '/'
    }
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
