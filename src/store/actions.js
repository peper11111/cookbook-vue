import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true
})

export default {
  loginUser (injectee, payload) {
    console.log('loginUser', http, injectee, payload)
  }
}
