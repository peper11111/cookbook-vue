import moment from 'moment'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import config from '@/config'
import pl from '@/i18n/messages/pl'
import 'moment/locale/pl'

moment.locale(config.locale)

Vue.use(VueI18n)

export default new VueI18n({
  locale: config.locale,
  messages: { pl }
})
