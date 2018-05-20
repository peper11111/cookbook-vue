import Vue from 'vue'
import Api from './api'
import http from './http'
import auth from './modules/auth'
import upload from './modules/upload'
import user from './modules/user'

Vue.use(Api)

export default new Api({
  http,
  modules: { auth, upload, user }
})