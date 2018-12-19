import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'

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

import alerta from './plugins/alerta'
Vue.prototype.$notify = alerta

import confirmar from './plugins/confirm'
Vue.prototype.$confirm = confirmar

import EventBus from './plugins/events'
Vue.prototype.$events = EventBus

import localStore from './store/local.js'
Vue.prototype.$localStore = localStore

import sessionStore from './store/session.js'
Vue.prototype.$sessionStore = sessionStore

import login from './plugins/login'
Vue.prototype.$login = login

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
