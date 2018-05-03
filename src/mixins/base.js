import upload from '../services/upload'

export default {
  methods: {
    url (filename) {
      return upload.url(filename)
    }
  }
}
