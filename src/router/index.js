import Vue from 'vue'
import VueRouter from 'vue-router'
import ExploreView from '@/components/views/ExploreView'
import FavoriteView from '@/components/views/FavoriteView'
import ProfileView from '@/components/views/ProfileView'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: ExploreView },
    { path: '/favorite', component: FavoriteView },
    { path: '/profile', component: ProfileView },
    { path: '*', redirect: '/' }
  ]
})
