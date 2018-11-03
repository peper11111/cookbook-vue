import requester from '@/mixins/requester'

export default {
  mixins: [ requester ],
  data () {
    return {
      email: '',
      username: '',
      login: '',
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
    generatePassword () {
      const chars = 'abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPGRSTUVWXYZ1234567890!@#$%^&*()'
      let password = ''
      for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      this.password = password
      this.passwordVisible = true
    }
  }
}
