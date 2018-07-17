import axios from 'axios'
import router from '@/plugins/router'
import store from '@/plugins/store'

const http = axios.create({
  baseURL: 'http://192.168.0.16:8000/api/v1',
  withCredentials: true
})

http.interceptors.response.use(value => value, reason => {
  if (reason.response.status === 401) {
    store.commit('logout')
    router.push('/login')
  }
  return Promise.reject(reason)
})

export default http
