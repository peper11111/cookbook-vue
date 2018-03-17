import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import LoginView from '@/components/LoginView'

Vue.use(Router)

export default new Router({
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
