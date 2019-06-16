import Router from '../router/index.js'
import localStore from '../store/local.js'
import sessionStore from '../store/session.js'

class Login {
    constructor () {
        this.$defineStorage()
    }

    $defineStorage () {
        if (localStore.state.manterLogado) {
            this.storage = localStore
        } else {
            this.storage = sessionStore
        }
    }

    usuarioLogado () {
        return this.storage.getters.getUsuarioLogado
    }

    login (login, senha) {
        return new Promise((resolve, reject) => {
            this.$validarUsuario(login, senha)
                .then(usuario => {
                    this.$defineStorage()

                    this.storage.commit('login', usuario)

                    resolve(usuario.permissao > 0)
                }).catch(erro => {
                    this.logout()
                    reject(erro)
                })
        })
    }

    logout () {
        this.storage.commit('logout')
        Router.push('/login')
    }

    $validarUsuario(login, senha) {
        return new Promise((resolve, reject) => {
            window.axios
                .post('/usuarios/autenticar/', {
                    login: login,
                    password: senha
                })
                .then(response => {
                    resolve(response.data)
                })
                .catch(erro => {
                    reject(erro)
                })
        })
    }

    validarNivel (...nivel) {
        return () => {
            let permitido = false
            nivel.forEach(element => {
                permitido = permitido || (this.storage.getters.getPermissao === element)
            })
            return permitido
        }
    }
}

const login = new Login()

export default login
