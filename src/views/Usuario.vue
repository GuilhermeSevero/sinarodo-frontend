<template>
    <q-page class="layout-page">
        <div
            v-if="!registroNovo"
            class="row justify-end"
        >
            <q-btn
                id="btnReiniciarSenha"
                push
                color="primary"
                icon="vpn_key"
                label="Reiniciar Senha"
                @click="$_reiniciarSenha"
            />
        </div>
        <container-manutencao
            class="row justify-between no-margin no-padding"
            :url="url"
            :parametros="parametros"
            :registro-novo="registroNovo"
            :validador="this.$v"
            :modifica-parametros="$_modificaParametros"
        >
            <div class="col-mmd-6">
                <q-field class="g-form-filtro-field">
                    <q-input
                        id="inpID"
                        v-model="parametros.id"
                        float-label="Código"
                        disable
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    :count="10"
                >
                    <q-input
                        id="inpMatricula"
                        v-model="parametros.matricula"
                        v-mask="'##########'"
                        float-label="Matrícula"
                        autofocus
                        clearable
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite o nome"
                    :error="$v.parametros.nome.$error"
                    :count="100"
                >
                    <q-input
                        id="inpNome"
                        v-model="parametros.nome"
                        float-label="Nome"
                        maxlength="100"
                        clearable
                        @blur="$v.parametros.nome.$touch"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    :count="50"
                >
                    <q-input
                        id="inpApelido"
                        v-model="parametros.apelido"
                        float-label="Apelido"
                        maxlength="50"
                        clearable
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite o login"
                    :error="$v.parametros.login.$error"
                    :count="30"
                >
                    <q-input
                        id="inpLogin"
                        v-model="parametros.login"
                        float-label="Login"
                        maxlength="30"
                        clearable
                        @blur="$v.parametros.login.$touch"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite um e-mail válido"
                    :error="$v.parametros.email.$error"
                    :count="250"
                >
                    <q-input
                        id="inpEmail"
                        v-model="parametros.email"
                        type="email"
                        float-label="e-Mail"
                        maxlength="250"
                        clearable
                        @blur="$v.parametros.email.$touch"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field class="g-form-filtro-field">
                    <q-input
                        id="inpTelefone"
                        v-model="parametros.telefone"
                        type="tel"
                        v-mask="'(##)#########'"
                        float-label="Telefone"
                        clearable
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field class="g-form-filtro-field">
                    <q-input
                        id="inpCpf"
                        v-model="parametros.cpf"
                        placeholder="000.000.000-00"
                        v-mask="'###.###.###-##'"
                        float-label="CPF"
                        clearable
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite uma função"
                    :error="$v.parametros.funcao_1.$error"
                    :count="30"
                >
                    <q-input
                        id="inpFuncao1"
                        v-model="parametros.funcao_1"
                        float-label="Função 01"
                        maxlength="30"
                        clearable
                        @blur="$v.parametros.funcao_1.$touch"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    :count="30"
                >
                    <q-input
                        id="inpPFuncao2"
                        v-model="parametros.funcao_2"
                        float-label="Função 02"
                        maxlength="30"
                        clearable
                    />
                </q-field>
            </div>
            <div class="col-sm-6">
                <q-field class="g-form-filtro-field g-checkbox-field">
                    <small>Permissão</small>
                    <div class="g-checkbox-group row justify-start">
                        <q-radio
                            id="chkAdmin"
                            class="col-md-6"
                            v-model="parametros.permissao"
                            label="Administrador"
                            :val="1"
                        />
                        <q-radio
                            id="chkGerente"
                            class="col-md-6"
                            v-model="parametros.permissao"
                            label="Gerente"
                            :val="2"
                        />
                        <q-radio
                            id="chkUsuario"
                            class="col-md-6"
                            v-model="parametros.permissao"
                            label="Usuário"
                            :val="3"
                        />
                    </div>
                </q-field>
            </div>
        </container-manutencao>
    </q-page>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'
import ContainerManutencao from '../components/ContainerManutencao'

export default {
    name: 'PageUsuario',

    components: {
        ContainerManutencao
    },

    directives: { mask },

    data () {
        return {
            url: '/usuarios/',
            senhaPadrao: '12345678',
            parametros: {
                id: null,
                matricula: null,
                nome: '',
                apelido: '',
                email: '',
                telefone: '',
                login: '',
                cpf: '',
                permissao: 3,
                funcao_1: '',
                funcao_2: ''
            }
        }
    },

    computed: {
        registroNovo() {
            return this.$route.params.id === '0'
        }
    },

    validations: {
        parametros: {
            nome: { required },
            email: { email },
            login: { required },
            permissao: { required },
            funcao_1: { required }
        }
    },

    mounted() {
        if (!this.registroNovo) {
            this.$_buscarDadosUsuario()
        } else {
            this.parametros.password = '12345678'
        }
    },

    methods: {
        $_buscarDadosUsuario() {
            this.$axios.get(`${this.url + this.$route.params.id}/`)
                .then(({ data }) => {
                    this.parametros = data
                })
                .catch(erro => {
                    this.$notify.error({
                        title: 'Erro ao Consultar',
                        message: 'Não foi possível buscar os dados do Usuario!',
                        apiError: erro
                    })
                    this.$router.back()
                })
        },
        $_reiniciarSenha() {
            this.$confirm('Reiniciar Senha?', `Deseja reiniciar a senha do usuário ${this.parametros.nome} para o valor 
            "${this.senhaPadrao}"? Na próxima vez que o usuário logar será solicitado a alteração da senha!`)
                .then(resposta => {
                    if (resposta) {
                        this.$axios
                            .patch(`/usuarios/${this.$route.params.id}/`, {
                                password: this.senhaPadrao,
                                precisa_novo_password: true
                            })
                            .then(() => {
                                this.$notify.success({
                                    title: 'Senha reiniciada!',
                                    message: `Senha do usuário foi reiniciada para ${this.senhaPadrao}. <br>
                                    No próximo login será solicitado a criação de uma nova senha!`,
                                    duration: 5000
                                })
                            })
                            .catch(error => {
                                this.$notify.error({
                                    title: 'Erro ao criar do usuário',
                                    message: 'Não foi possível criar a senha para o usuário!',
                                    apiError: error
                                })
                                this.carregando = false
                            })
                    }
                })
        },

        $_modificaParametros(parametros) {
            if (parametros.cpf) {
                parametros.cpf = parametros.cpf.split('.').join('').split('-').join('')
            }
            if (parametros.telefone) {
                parametros.telefone = parametros.telefone.replace('(', '').replace(')', '')
            }
            return parametros
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
