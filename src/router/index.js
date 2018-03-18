import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/components/HomeView'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: HomeView }
  ]
})
