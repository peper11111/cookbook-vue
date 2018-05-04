import axios from 'axios'
import store from '../store'
import { SET_AUTH } from '../store/mutation-types'
import router from '../router'

const http = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true
})

http.interceptors.response.use(value => value, error => {
  if (error.response.status === 401) {
    store.commit(SET_AUTH, { loggedIn: false })
    router.push('/login')
  }
  return Promise.reject(error)
})

export default http
