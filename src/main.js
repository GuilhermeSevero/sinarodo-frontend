import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/quasar.styl'
import 'quasar-framework/dist/quasar.ie.polyfills'
import lang from 'quasar-framework/i18n/pt-br'
import 'quasar-extras/animate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import Quasar from 'quasar'

Vue.use(Quasar, {
  config: {}, i18n: lang
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
