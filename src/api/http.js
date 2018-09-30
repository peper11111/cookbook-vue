import axios from 'axios'
import config from '@/config'
import router from '@/router'
import store from '@/store'
import { LOGOUT } from '@/store/mutation-types'

const http = axios.create({
  baseURL: config.baseURL,
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
