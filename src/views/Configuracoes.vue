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
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite o valor do acréscimo"
                    :error="$v.parametros.acrescimo_encarregado.$error"
                >
                    <q-input
                        id="inpAcrescimoEncarregado"
                        v-model="parametros.acrescimo_encarregado"
                        suffix="%"
                        float-label="Acréscimo encarregado (%)"
                        clearable
                        autofocus
                        @blur="$v.parametros.acrescimo_encarregado.$touch"
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite o mínimo de dias em campo"
                    :error="$v.parametros.dias_em_campo.$error"
                >
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.dias_em_campo"
                        type="number"
                        :decimals="0"
                        float-label="Mínimo de dias em campo"
                        clearable
                        @blur="$v.parametros.dias_em_campo.$touch"
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite a premiação para SEIS pontos"
                    :error="$v.parametros.premio_seis.$error"
                >
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.premio_seis"
                        type="number"
                        :decimals="0"
                        float-label="Valor premiação 6 Pontos"
                        clearable
                        @blur="$v.parametros.premio_seis.$touch"
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite a premiação para SETE pontos"
                    :error="$v.parametros.premio_sete.$error"
                >
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.premio_sete"
                        type="number"
                        :decimals="0"
                        float-label="Valor premiação 7 Pontos"
                        clearable
                        @blur="$v.parametros.premio_sete.$touch"
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite a premiação para OITO pontos"
                    :error="$v.parametros.premio_oito.$error"
                >
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.premio_oito"
                        type="number"
                        :decimals="0"
                        float-label="Valor premiação 8 Pontos"
                        clearable
                        @blur="$v.parametros.premio_oito.$touch"
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite a premiação para NOVE pontos"
                    :error="$v.parametros.premio_nove.$error"
                >
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.premio_nove"
                        type="number"
                        :decimals="0"
                        float-label="Valor premiação 9 Pontos"
                        clearable
                        @blur="$v.parametros.premio_nove.$touch"
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite a premiação para DEZ pontos"
                    :error="$v.parametros.premio_dez.$error"
                >
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.premio_dez"
                        type="number"
                        :decimals="0"
                        float-label="Valor premiação 10 Pontos"
                        clearable
                        @blur="$v.parametros.premio_dez.$touch"
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
                dias_em_campo: null,
                acrescimo_encarregado: null,
                premio_seis: null,
                premio_sete: null,
                premio_oito: null,
                premio_nove: null,
                premio_dez: null
            }
        }
    },

    validations: {
        parametros: {
            dias_em_campo: { required },
            acrescimo_encarregado: { required },
            premio_seis: { required },
            premio_sete: { required },
            premio_oito: { required },
            premio_nove: { required },
            premio_dez: { required }
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
