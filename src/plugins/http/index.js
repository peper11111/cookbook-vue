import axios from 'axios'
import Vue from 'vue'
import router from '@/plugins/router'
import store from '@/plugins/store'

axios.install = (_Vue) => {
  _Vue.mixin({
    beforeCreate () {
      const options = this.$options
      if (options.http) {
        this.$http = options.http
      } else if (options.parent && options.parent.$http) {
        this.$http = options.parent.$http
      }
    }
  })
}

Vue.use(axios)

const http = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true
})

http.interceptors.response.use(value => value, error => {
  if (error.response.status === 401) {
    store.commit('logout')
    router.push('/login')
  }
  return Promise.reject(error)
})

export default http
