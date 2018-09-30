export default {
  data () {
    return {
      submitting: false,
      email: '',
      username: '',
      login: '',
      password: '',
      passwordVisible: false
    }
  },
  methods: {
    submit () {
      if (this.submitting) {
        return
      }
      this.submitting = true
      this.request().finally(() => {
        this.submitting = false
      })
    },
    getPasswordFieldType () {
      return this.passwordVisible ? 'text' : 'password'
    },
    togglePassword () {
      this.passwordVisible = !this.passwordVisible
    },
    generatePassword () {
      const chars = 'abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPGRSTUVWXYZ1234567890!@#$%^&*()'
      this.password = ''
      for (let i = 0; i < 10; i++) {
        this.password += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      this.passwordVisible = true
    }
  }
}
