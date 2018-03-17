import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/components/HomeView'
import LoginView from '@/components/LoginView'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    }
  ]
})
