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
        estabelecimentosCarregados: false,
        estabelecimento: 0,
        filtros: {}
    },

    getters: {

    },

    mutations: {
        setEstabelecimentoCarregados(state, value) {
            state.estabelecimentosCarregados = value
        },

        setEstabelecimento(state, estabelecimento) {
            state.estabelecimento = estabelecimento
        },

        setFiltros(state, filtros) {
            state.filtros = filtros
        }
    },

    actions: {

    },

    plugins: [
        createPersistedState({
            key: 'rastreamento-ecom',

            storage: window.sessionStorage
        })
    ]
})
