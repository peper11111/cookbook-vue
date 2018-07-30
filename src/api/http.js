import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { LOGOUT } from '@/store/mutation-types'

const http = axios.create({
  baseURL: 'http://192.168.0.5:8000/api/v1',
  withCredentials: true
})

http.interceptors.response.use(value => value, reason => {
  if (reason.response.status === 401) {
    store.commit(LOGOUT)
    router.push('/login')
  }
  return Promise.reject(reason)
})

export default http
