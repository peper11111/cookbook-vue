import axios from 'axios'
import querystring from 'querystring'

const http = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true
})

export default {
  loginUser (injectee, payload) {
    return http.post('/login', querystring.stringify(payload), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  }
}
