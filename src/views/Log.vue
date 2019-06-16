<template>
    <q-page class="layout-page">
        <container-manutencao
            class="row justify-between no-margin no-padding"
            url=""
            :parametros="parametros"
            ocultar-salvar
        >
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                >
                    <q-input
                        id="inpUsuario"
                        v-model="parametros.usuario.nome"
                        float-label="Usuário alteração"
                        readonly
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                >
                    <q-datetime
                        id="dtData"
                        v-model="parametros.data_hora"
                        float-label="Data Alteração"
                        format="DD/MM/YYYY HH:mm:ss"
                        readonly
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                >
                    <q-input
                        id="inpAcrescimoEncarregado"
                        v-model="parametros.log.acrescimo_encarregado"
                        suffix="%"
                        float-label="Acréscimo encarregado (%)"
                        readonly
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                >
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.log.dias_em_campo"
                        type="number"
                        :decimals="0"
                        float-label="Mínimo de dias em campo"
                        readonly
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                >
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.log.premio_seis"
                        type="number"
                        :decimals="0"
                        float-label="Valor premiação 6 Pontos"
                        readonly
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                >
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.log.premio_sete"
                        type="number"
                        :decimals="0"
                        float-label="Valor premiação 7 Pontos"
                        readonly
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                >
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.log.premio_oito"
                        type="number"
                        :decimals="0"
                        float-label="Valor premiação 8 Pontos"
                        readonly
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                >
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.log.premio_nove"
                        type="number"
                        :decimals="0"
                        float-label="Valor premiação 9 Pontos"
                        readonly
                    />
                </q-field>
            </div>
            <div class="col-md-6">
                <q-field
                    class="g-form-filtro-field"
                >
                    <q-input
                        id="inValorPonto"
                        v-model="parametros.log.premio_dez"
                        type="number"
                        :decimals="0"
                        float-label="Valor premiação 10 Pontos"
                        readonly
                    />
                </q-field>
            </div>
        </container-manutencao>
    </q-page>
</template>

<script>
import ContainerManutencao from '../components/ContainerManutencao'

export default {
    name: 'PageConfiguracoes',

    components: { ContainerManutencao },

    data() {
        return {
            url: '/logs/',

            carregando: false,

            parametros: {
                data_hora: null,
                usuario: {
                    nome: ''
                },
                log: {
                    dias_em_campo: null,
                    acrescimo_encarregado: null,
                    premio_seis: null,
                    premio_sete: null,
                    premio_oito: null,
                    premio_nove: null,
                    premio_dez: null
                }
            }
        }
    },

    computed: {
        idLog() {
            return this.$route.params.id
        }
    },

    mounted() {
        this.$_buscarConfiguracoes()
    },

    methods: {
        $_buscarConfiguracoes() {
            this.carregando = true
            this.$axios
                .get(`${this.url}${this.idLog}/`, {
                    params: {
                        expand: 'usuario'
                    }
                })
                .then(({ data }) => {
                    this.parametros = data
                    this.parametros.log = JSON.parse(data.log)
                    this.carregando = false
                })
                .catch(erro => {
                    this.$notify.error({
                        title: 'Erro ao Consultar',
                        message: 'Não foi possível buscar os dados do Log!',
                        apiError: erro
                    })
                    this.carregando = false
                })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
