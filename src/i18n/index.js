import Vue from 'vue'
import VueI18n from 'vue-i18n'
import pl from './messages/pl'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'pl',
  messages: { pl }
})
