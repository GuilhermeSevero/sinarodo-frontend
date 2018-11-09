<template>
    <q-page class="layout-page">
        <container-manutencao
            class="row justify-between no-margin no-padding"
            :url="url"
            :parametros="parametros"
            :registro-novo="registroNovo"
            :validador="this.$v"
        >
            <div class="col-mmd-6">
                <q-field class="g-form-filtro-field">
                    <q-input
                        id="inpID"
                        v-model="id"
                        float-label="Código"
                        disable
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field class="g-form-filtro-field">
                    <q-input
                        id="inpMatricula"
                        v-model="matricula"
                        v-mask="'############'"
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
                    :error="$v.nome.$error"
                >
                    <q-input
                        id="inpNome"
                        v-model="nome"
                        float-label="Nome"
                        clearable
                        @blur="$v.nome.$touch"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field class="g-form-filtro-field">
                    <q-input
                        id="inpApelido"
                        v-model="apelido"
                        float-label="Apelido"
                        clearable
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite o login"
                    :error="$v.login.$error"
                >
                    <q-input
                        id="inpLogin"
                        v-model="login"
                        float-label="Login"
                        clearable
                        @blur="$v.login.$touch"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite um e-mail válido"
                    :error="$v.email.$error"
                >
                    <q-input
                        id="inpEmail"
                        v-model="email"
                        float-label="e-Mail"
                        clearable
                        @blur="$v.email.$touch"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field class="g-form-filtro-field">
                    <q-input
                        id="inpTelefone"
                        v-model="telefone"
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
                        v-model="cpf"
                        placeholder="000.000.000-00"
                        v-mask="'###.###.###-##'"
                        float-label="CPF"
                        clearable
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field class="g-form-filtro-field">
                    <q-input
                        id="inpFuncao1"
                        v-model="funcao1"
                        float-label="Função 01"
                        clearable
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field class="g-form-filtro-field">
                    <q-input
                        id="inpPFuncao2"
                        v-model="funcao2"
                        float-label="Função 02"
                        clearable
                    />
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
      id: null,
      matricula: null,
      nome: '',
      apelido: '',
      email: '',
      telefone: '',
      login: '',
      cpf: '',
      permissao: 3,
      funcao1: '',
      funcao2: ''
    }
  },

  computed: {
    registroNovo() {
      return this.$route.params.id === '0'
    },

    parametros: {
      get() {
        return {
          id: this.id,
          matricula: this.matricula,
          nome: this.nome,
          apelido: this.apelido,
          email: this.email,
          telefone: this.telefone,
          login: this.login,
          cpf: this.cpf,
          permissao: this.permissao,
          funcao1: this.funcao1,
          funcao2: this.funcao2
        }
      },
      set(parametros) {
        this.id = parametros.id
        this.matricula = parametros.matricula
        this.nome = parametros.nome
        this.apelido = parametros.apelido
        this.email = parametros.email
        this.telefone = parametros.telefone
        this.login = parametros.login
        this.cpf = parametros.cpf
        this.permissao = parametros.permissao
        this.funcao1 = parametros.funcao1
        this.funcao2 = parametros.funcao2
      }
    }
  },

  validations: {
    nome: { required },
    email: { email },
    login: { required },
    permissao: { required },
    funcao1: { required }
  },

  mounted() {
    if (!this.registroNovo) {
      this.$_buscarDadosUsuario()
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
