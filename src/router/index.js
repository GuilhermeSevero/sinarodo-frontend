import Vue from 'vue'
import VueRouter from 'vue-router'
import EventBus from '../plugins/events'
import alerta from '../plugins/alerta'
import login from '../plugins/login.js'
import { Loading } from 'quasar'
import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({ routes })

Router.afterEach((to, from) => {
    Loading.hide()
})

Router.beforeEach((to, from, next) => {
    if ((!to.meta.auth) || (login.storage.getters.getUsuarioAutenticado)) {
        if (to.meta.possuiNivel()) {
            EventBus.$emit('carregarAcoes', { hidden: true })
            Loading.show()
            next()
        } else {
            alerta.warning({
                title: 'Acesso negado',
                message: `Usuário informado, não possui permissão para acessar a página ${to.meta.title}`,
                duration: 10000
            })
            next(from)
        }
    } else {
        next({ path: '/login' })
    }
})

export default Router
