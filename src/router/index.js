import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/components/views/HomeView'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomeView }
  ]
})
