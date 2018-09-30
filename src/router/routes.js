export default [
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
    path: '/recipe/:id',
    component: () => import('@/pages/recipe-page'),
    meta: { requiresAuth: true }
  },
  {
    path: '/sign-in',
    component: () => import('@/pages/sign-in-page')
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
