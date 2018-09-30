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
    component: () => import('@/pages/intro/sign-in-page')
  },
  {
    path: '/register',
    component: () => import('@/pages/intro/register-page')
  },
  {
    path: '/register/verify',
    component: () => import('@/pages/intro/register-verify-page')
  },
  {
    path: '/reset',
    component: () => import('@/pages/intro/reset-page')
  },
  {
    path: '/reset/confirm',
    component: () => import('@/pages/intro/reset-confirm-page')
  },
  {
    path: '*',
    redirect: '/'
  }
]
