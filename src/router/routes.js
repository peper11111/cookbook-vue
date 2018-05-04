import ConfirmView from '../components/views/ConfirmView'
import FavoriteView from '../components/views/FavoriteView'
import HomeView from '../components/views/HomeView'
import LoginView from '../components/views/LoginView'
import ProfileView from '../components/views/ProfileView'
import RegisterView from '../components/views/RegisterView'
import ResetView from '../components/views/ResetView'
import VerifyView from '../components/views/VerifyView'

export default [
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
