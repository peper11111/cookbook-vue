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
        this.$router.push({ path: '/login' })
      } else {
        this.$router.push({ path: '/login', query: { action } })
      }
    }
  }
}
