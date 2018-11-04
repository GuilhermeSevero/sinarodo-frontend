import Router from '../router/index.js'
import localStore from '../store/local.js'
import sessionStore from '../store/session.js'
import axios from 'axios'

class Login {
  constructor () {
    this.$defineStorage()
    this.axios = axios.create({
      baseURL: 'http://127.0.0.1:8000',
      timeout: 5000,
      headers: {
        'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.UeTLepnxcvUBS7c8z2b9Vw5ahIUoY18P9tVtFCbBpIo'
      }
    })
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
      this.axios
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
