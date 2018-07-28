import Vue from 'vue'
import http from './http'
import install from './install'

const api = {
  install,
  auth: {
    login: (data) => http.post('/auth/login', data),
    logout: () => http.post('/auth/logout'),
    register: (data) => http.post('/auth/register', data),
    verify: (data) => http.post('/auth/verify', data),
    reset: (data) => http.post('/auth/reset', data),
    confirm: (data) => http.post('/auth/confirm', data)
  },
  cuisines: {
    readAll: () => http.get('/cuisines')
  },
  recipes: {
    create: (data) => http.post('/recipes', data),
    read: (id) => http.get(`/recipes/${id}`)
  },
  uploads: {
    url: (id) => `${http.defaults.baseURL}/uploads/${id}`,
    create: (data) => http.post('/uploads', data),
    read: (id) => http.get(`/uploads/${id}`),
    delete: (id) => http.delete(`/uploads/${id}`)
  },
  users: {
    current: () => http.get('/users/current'),
    read: (id) => http.get(`/users/${id}`),
    modify: (id, data) => http.patch(`/users/${id}`, data),
    follow: (id) => http.post(`/users/${id}/follow`),
    recipes: (id) => http.get(`/users/${id}/recipes`)
  }
}

Vue.use(api)

export default api
