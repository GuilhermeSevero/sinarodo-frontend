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
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite uma descrição"
                    :error="$v.descricao.$error"
                >
                    <q-input
                        id="inpDescricao"
                        v-model="descricao"
                        float-label="Descrição"
                        autofocus
                        clearable
                        @blur="$v.descricao.$touch"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite um peso"
                    :error="$v.peso.$error"
                >
                    <q-input
                        id="inpPeso"
                        v-model="peso"
                        v-mask="'###'"
                        float-label="Peso"
                        clearable
                        @blur="$v.peso.$touch"
                    />
                </q-field>
            </div>
        </container-manutencao>
    </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'
import ContainerManutencao from '../components/ContainerManutencao'

export default {
    name: 'PageCategoria',

    components: {
        ContainerManutencao
    },

    directives: { mask },

    data () {
        return {
            url: '/categorias/',
            id: null,
            descricao: '',
            peso: null
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
                    descricao: this.descricao,
                    peso: this.peso
                }
            },
            set(parametros) {
                this.id = parametros.id
                this.descricao = parametros.descricao
                this.peso = parametros.peso
            }
        }
    },

    validations: {
        descricao: { required },
        peso: { required }
    },

    mounted() {
        if (!this.registroNovo) {
            this.$_buscarDadosCategoria()
        }
    },

    methods: {
        $_buscarDadosCategoria() {
            this.$axios.get(`${this.url + this.$route.params.id}/`)
                .then(({ data }) => {
                    this.parametros = data
                })
                .catch(erro => {
                    this.$notify.error({
                        title: 'Erro ao Consultar',
                        message: 'Não foi possível buscar os dados da Categoria!',
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
