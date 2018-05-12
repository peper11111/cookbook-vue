const ConfirmView = () => import('@/components/views/ConfirmView')
const FavoriteView = () => import('@/components/views/FavoriteView')
const HomeView = () => import('@/components/views/HomeView')
const LoginView = () => import('@/components/views/LoginView')
const NewRecipeView = () => import('@/components/views/NewRecipeView')
const ProfileView = () => import('@/components/views/ProfileView')
const RegisterView = () => import('@/components/views/RegisterView')
const ResetView = () => import('@/components/views/ResetView')
const VerifyView = () => import('@/components/views/VerifyView')

export default [
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
