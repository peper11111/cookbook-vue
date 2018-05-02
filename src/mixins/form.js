import { SHOW_INFO, SHOW_ERROR } from '../store/mutation-types'

export default {
  data () {
    return {
      email: '',
      username: '',
      password: '',
      passwordVisible: false
    }
  },
  methods: {
    getPasswordFieldType () {
      return this.passwordVisible ? 'text' : 'password'
    },
    togglePassword () {
      this.passwordVisible = !this.passwordVisible
    },
    setActiveAction (action) {
      if (action === 'login') {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ path: '/', query: { action } })
      }
    },
    processValue (value) {
      this.$store.commit(SHOW_INFO, value.data.message)
      this.setActiveAction('login')
    },
    processError (error) {
      this.$store.commit(SHOW_ERROR, error.response.data.message)
    }
  }
}
