import Vue from 'vue'
import VueI18n from 'vue-i18n'
import config from '@/config'
import pl from '@/i18n/messages/pl'

Vue.use(VueI18n)

export default new VueI18n({
  locale: config.locale,
  messages: { pl }
})
