import axios from 'axios'
import config from '@/config'
import notify from '@/notify'
import router from '@/router'
import store from '@/store'
import { LOGOUT } from '@/store/mutation-types'

const http = axios.create({
  baseURL: config.baseURL,
  withCredentials: true
})

http.interceptors.response.use((value) => value, (reason) => {
  if (reason.response.status === 401) {
    if (router.currentRoute.meta.requiresAuth && store.state.auth.loggedIn) {
      store.commit(LOGOUT)
      notify.info('session-timeout')
      router.push('/login')
    }
  } else {
    notify.error(reason.response.data.code)
  }
  return Promise.reject(reason)
})

export default http
