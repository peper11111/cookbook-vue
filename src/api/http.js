import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true
})

http.interceptors.response.use(value => value, error => {
  if (error.response.status === 401) {
    // auth.logout()
  }
  return Promise.reject(error)
})

export default http
