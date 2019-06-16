<template>
    <div class="generic-margin row justify-center items-center">
        <q-jumbotron
            class="nova-senha-container"
        >
            <div class="q-display-3">Atenção!</div>
            <div class="q-subheading">
                Será necessário criar uma nova senha!
            </div>
            <hr class="q-hr q-my-lg">
            <q-field
                class="c-field-nova-senha"
                :count="30"
                :error="$v.novaSenha.$error"
                error-label="Digite uma nova senha"
            >
                <q-input
                    id="inpNovaSenha"
                    v-model="novaSenha"
                    class="c-input"
                    float-label="Nova Senha"
                    autocomplete="off"
                    type="password"
                    :maxlength="30"
                    @blur="$v.novaSenha.$touch"
                    @keyup.enter="$_alterarSenha"
                />
            </q-field>
            <q-field
                class="c-field-nova-senha"
                :count="30"
                error-label="Repita a senha"
                :error="$v.novaSenha2.$error"
            >
                <q-input
                    id="inpNovaSenha2"
                    v-model="novaSenha2"
                    class="c-input"
                    float-label="Digite novamente"
                    autocomplete="off"
                    type="password"
                    :maxlength="30"
                    @blur="$v.novaSenha2.$touch"
                    @keyup.enter="$_alterarSenha"
                />
            </q-field>
            <div
                class="row justify-center"
            >
                <q-btn
                    push
                    id="btnAlterar"
                    color="primary"
                    icon="vpn_key"
                    label="Criar"
                    @click="$_alterarSenha"
                />
            </div>
        </q-jumbotron>
        <q-inner-loading :visible="carregando">
            <q-spinner
                size="50px"
                color="primary"
            />
        </q-inner-loading>
        <alerta />
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Alerta from '../components/Alertas'

export default {
    name: 'PageNovaSenha',

    components: {
        Alerta
    },

    data() {
        return {
            novaSenha: null,
            novaSenha2: null,
            carregando: false
        }
    },

    computed: {
        idUsuario() {
            return this.$login.storage.getters.getCodigoUsuario
        }
    },

    validations: {
        novaSenha: { required },
        novaSenha2: { required }
    },

    methods: {
        $_alterarSenha() {
            this.$v.novaSenha.$touch()
            this.$v.novaSenha2.$touch()
            if (!this.$v.$error) {
                this.carregando = true
                if (this.novaSenha === this.novaSenha2) {
                    this.$axios
                        .patch(`/usuarios/${this.idUsuario}/`, {
                            password: this.novaSenha,
                            precisa_novo_password: false
                        })
                        .then(() => {
                            this.$login.logout()
                            this.carregando = false
                        })
                        .catch(error => {
                            this.$notify.error({
                                title: 'Erro ao criar do usuário',
                                message: 'Não foi possível criar a senha para o usuário!',
                                apiError: error
                            })
                            this.carregando = false
                        })
                } else {
                    this.$notify.error({
                        title: 'Senha não bate!',
                        message: 'As duas senhas devem ser iguais!',
                        duration: 5000
                    })
                    this.carregando = false
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.nova-senha-container {
  margin-top: 5%;
}
.c-field-nova-senha {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
