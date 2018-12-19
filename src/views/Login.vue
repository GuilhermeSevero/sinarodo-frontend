<template>
    <div class="c-container-login container row justify-center items-center">
        <div class="login-container layout-padding shadow-3 col-xs-9 col-sm-7 col-md-4 col-lg-4 col-xl-4">
            <div class="logo sinarodo" />
            <div>
                <q-field
                    class="c-field-login"
                    :count="30"
                    :error="usuarioInvalido"
                    error-label="Usuário inválido"
                >
                    <q-input
                        id="inpUsuario"
                        v-model="usuario"
                        ref="inputUsuario"
                        class="c-input"
                        float-label="Usuário"
                        autofocus
                        autocomplete="off"
                        :maxlength="30"
                        @blur="$v.usuario.$touch"
                        @keyup.enter="$_handleSubmit"
                        :error="$v.usuario.$error"
                    />
                </q-field>
                <q-field
                    class="c-field-login"
                    :count="30"
                    :error="senhaInvalida"
                    error-label="Senha inválida"
                >
                    <q-input
                        id="inpSenha"
                        v-model="senha"
                        class="c-input"
                        float-label="Senha"
                        autocomplete="off"
                        type="password"
                        :maxlength="30"
                        @blur="$v.senha.$touch"
                        @keyup.enter="$_handleSubmit"
                        :error="$v.senha.$error"
                    />
                </q-field>
            </div>
            <div class="c-margin-botton row justify-start">
                <q-checkbox
                    id="chkManterLogado"
                    v-model="manterLogado"
                    class="remember c-checkbox"
                    label="Manter logado"
                />
            </div>
            <span
                class="c-msg-invalida"
                v-show="codigoUsuario == 0 && tentouLogar && !usuarioInvalido && !senhaInvalida"
            >
                <i class="material-icons q-icon">highlight_off</i>
                Usuário ou senha inválidos!
            </span>
            <div class="row justify-center col-6">
                <q-btn
                    push
                    id="btnAcessar"
                    color="primary"
                    :loading="acessando"
                    @click="$_handleSubmit"
                >
                    Acessar
                </q-btn>
            </div>
            <q-inner-loading :visible="loading">
                <q-spinner
                    size="50px"
                    color="primary"
                />
            </q-inner-loading>
        </div>
        <alerta />
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Alerta from '../components/Alertas'

export default {
    name: 'PgLogin',

    components: {
        Alerta
    },

    data() {
        return {
            tentouLogar: false,
            acessando: false,
            senhaInvalida: false,
            usuarioInvalido: false,
            usuario: '',
            senha: '',
            loading: false
        }
    },

    computed: {
        codigoUsuario() {
            return this.$login.storage.getters.getCodigoUsuario
        },

        precisaNovoPassword() {
            return this.$login.storage.getters.getUsuarioLogado.precisa_novo_password
        },

        manterLogado: {
            get() {
                return this.$localStore.state.manterLogado
            },

            set(manter) {
                this.$localStore.commit('setManterLogado', manter)
            }
        }
    },

    watch: {
        usuario: function() {
            this.tentouLogar = false
            this.usuarioInvalido = false
        },

        senha: function() {
            this.tentouLogar = false
            this.senhaInvalida = false
        }
    },

    validations: {
        usuario: { required },
        senha: { required }
    },

    methods: {
        $_handleSubmit() {
            this.loading = true
            this.$v.$touch()
            if (this.$v.$error) {
                this.usuarioInvalido = this.$v.usuario.$error
                this.senhaInvalida = this.$v.senha.$error
                if (this.$v.usuario.$error) {
                    this.$notify.error({
                        message: 'Informe seu usuário!',
                        duration: 3000
                    })
                } else {
                    if (this.$v.senha.$error) {
                        this.$notify.error({
                            message: 'Informe a senha!',
                            duration: 3000
                        })
                    }
                }
                this.tentouLogar = true
                this.loading = false
            } else {
                this.$login
                    .login(this.usuario, this.senha)
                    .then(resposta => {
                        if (resposta) {
                            if (!this.precisaNovoPassword) {
                                this.$router.push('/')
                            } else {
                                this.$router.push(`/nova-senha`)
                            }
                        } else {
                            this.$notify.error({
                                title: 'Usuário não autenticado',
                                message: 'Verifique as suas permissões de acesso!',
                                duration: 5000
                            })
                        }
                        this.tentouLogar = true
                        this.loading = false
                        this.senha = ''
                    })
                    .catch((error) => {
                        if (this.$refs.inputUsuario) {
                            this.$refs.inputUsuario.focus()
                        }
                        this.$notify.error({
                            title: 'Usuário não autenticado',
                            message: 'Verifique o usuário e senha informados!',
                            duration: 5000,
                            apiError: error
                        })
                        this.tentouLogar = true
                        this.loading = false
                        this.senha = ''
                    })
            }
        }
    }
}
</script>

<style lang="scss">
.c-container-login {
  .c-margin-botton {
    margin-bottom: 20px;
  }

  .container {
    margin-top: 20px;
  }

  .login-container {
    height: 420px;
    margin-top: 10%;
  }

  .logo {
    width: 100%;
    height: 140px;
    background-repeat: no-repeat;
    background-position-x: 50%;
    background-position-y: 50%;
    margin-bottom: center;
  }

  .logo.sinarodo {
    background-image: url("../assets/logo.png");
  }

  .c-input {
    padding: 0;
    margin: 0;
  }

  .c-field-login {
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
</style>
