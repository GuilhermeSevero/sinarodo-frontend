import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import Auth from './modules/auth.js'

export default new Vuex.Store({
    namespaced: true,

    modules: {
        auth: Auth
    },

    state: {
        manterLogado: false
    },

    getters: {

    },

    mutations: {
        setManterLogado(state, manterLogado){
            state.manterLogado = manterLogado
        }
    },

    actions: {

    },

    plugins: [
        createPersistedState({
            key: 'rastreamento-ecom'
        })
    ]
})
