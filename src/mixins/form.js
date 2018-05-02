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
    }
  }
}
