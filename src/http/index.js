import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true
})

/*
http.interceptors.response.use((value) => Promise.resolve(value), (error) => {
  if (error.response.status === 401) {
    window.location.replace('/')
  }
  return Promise.reject(error)
})
*/
