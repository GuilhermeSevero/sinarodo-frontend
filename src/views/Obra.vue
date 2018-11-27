<template>
    <q-page class="layout-page">
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
                >
                    <q-datetime
                        id="dateLancamento"
                        v-model="parametros.data_lancamento"
                        type="date"
                        float-label="Data Lançamento"
                        format="DD/MM/YYYY"
                        disable
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    :count="20"
                    error-label="Digite o número do pedido"
                    :error="$v.parametros.pedido.$error"
                >
                    <q-input
                        id="inpPedido"
                        v-model="parametros.pedido"
                        float-label="Pedido"
                        maxlength="20"
                        autofocus
                        clearable
                        @blur="$v.parametros.pedido.$touch"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite a data de inicio da obra"
                    :error="$v.parametros.data_inicio.$error"
                >
                    <q-datetime
                        id="dateInicio"
                        v-model="parametros.data_inicio"
                        :max="parametros.data_final"
                        type="date"
                        float-label="Data Inicio"
                        clearable
                        format="DD/MM/YYYY"
                        @blur="$v.parametros.data_inicio.$touch"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite a data de fim da obra"
                    :error="$v.parametros.data_final.$error"
                >
                    <q-datetime
                        id="dateFinal"
                        v-model="parametros.data_final"
                        :min="parametros.data_inicio"
                        type="date"
                        float-label="Data Final"
                        clearable
                        format="DD/MM/YYYY"
                        @blur="$v.parametros.data_final.$touch"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    :count="300"
                >
                    <q-input
                        id="inpObservacao"
                        v-model="parametros.observacao"
                        type="textarea"
                        float-label="Observação"
                        maxlength="300"
                        clearable
                    />
                </q-field>
            </div>
        </container-manutencao>
    </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { date } from 'quasar'
import ContainerManutencao from '../components/ContainerManutencao'

export default {
    name: 'PageObra',

    components: { ContainerManutencao },

    data() {
        return {
            url: '/obras/',

            parametros: {
                id: null,
                pedido: null,
                data_lancamento: null,
                data_inicio: null,
                data_final: null,
                observacao: ''
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
            pedido: { required },
            data_inicio: { required },
            data_final: { required }
        }
    },

    mounted() {
        if (!this.registroNovo) {
            this.$_buscarDadosObra()
        } else {
            this.parametros.data_lancamento = Date.now()
        }
    },

    methods: {
        $_modificaParametros(parametros) {
            if (parametros.data_lancamento) {
                parametros.data_lancamento = date.formatDate(this.parametros.data_lancamento, 'YYYY-MM-DD')
            }
            if (parametros.data_inicio) {
                parametros.data_inicio = date.formatDate(this.parametros.data_inicio, 'YYYY-MM-DD')
            }
            if (parametros.data_final) {
                parametros.data_final = date.formatDate(this.parametros.data_final, 'YYYY-MM-DD')
            }
            return parametros
        },

        $_buscarDadosObra() {
            this.$axios.get(`${this.url + this.$route.params.id}/`)
                .then(({ data }) => {
                    this.parametros = data
                })
                .catch(erro => {
                    this.$notify.error({
                        title: 'Erro ao Consultar',
                        message: 'Não foi possível buscar os dados da Obra!',
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
