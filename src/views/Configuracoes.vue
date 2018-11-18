<template>
    <q-page class="layout-page">
        <container-manutencao
            class="row justify-between no-margin no-padding"
            :url="url"
            :parametros="parametros"
            :registro-novo="registroNovo"
            :validador="this.$v"
            :show-cancelar="false"
            :id-registro="idRegistroConfiguracao"
        >
            <div class="col-mmd-6">
                <q-field class="g-form-filtro-field">
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.valor_por_ponto"
                        type="number"
                        :decimals="2"
                        prefix="R$ "
                        float-label="Valor por ponto"
                        autofocus
                        clearable
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field class="g-form-filtro-field">
                    <q-input
                        id="inpAcrescimoEncarregado"
                        v-model="parametros.acrescimo_encarregado"
                        suffix="%"
                        float-label="Acréscimo encarregado"
                        clearable
                    />
                </q-field>
            </div>
        </container-manutencao>
    </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import ContainerManutencao from '../components/ContainerManutencao'

export default {
    name: 'PageConfiguracoes',

    components: { ContainerManutencao },

    data() {
        return {
            url: '/configuracoes/',
            registroNovo: false,
            idRegistroConfiguracao: 1,
            parametros: {
                valor_por_ponto: null,
                acrescimo_encarregado: null
            }
        }
    },

    validations: {
        parametros: {
            valor_por_ponto: { required },
            acrescimo_encarregado: { required }
        }
    },

    mounted() {
        this.$_buscarConfiguracoes()
    },

    methods: {
        $_buscarConfiguracoes() {
            this.$axios
                .get(`${this.url}1/`)
                .then(({ data }) => {
                    this.parametros = data
                })
                .catch(erro => {
                    if (erro.response.status === 404) {
                        this.registroNovo = true
                    } else {
                        this.$notify.error({
                            title: 'Erro ao Consultar',
                            message: 'Não foi possível buscar as Configurações!',
                            apiError: erro
                        })
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
