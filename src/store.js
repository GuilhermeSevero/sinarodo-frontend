import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: {
      nome: 'Admin',
      login: '',
      nivel: -1
    }
  },
  mutations: {

  },
  actions: {

  }
})
