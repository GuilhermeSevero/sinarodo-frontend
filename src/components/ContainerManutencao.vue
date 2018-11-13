<template>
    <div class="no-margin">
        <slot/>
        <q-field class="generic-margin col-12">
            <q-btn-group
                class="btn-group q-my-xs"
                outline
            >
                <q-btn
                    id="btnSalvar"
                    push
                    color="primary"
                    icon="search"
                    :label="lowResolution ? '' : 'Salvar'"
                    @click="salvar"
                />
                <q-btn
                    v-if="showCancelar"
                    id="btnCancelar"
                    push
                    icon="clear"
                    :label="lowResolution ? '' : 'Cancelar'"
                    @click="$_voltar"
                />
            </q-btn-group>
        </q-field>
        <q-inner-loading :visible="carregando">
            <q-spinner
                size="50px"
                color="primary"
            />
        </q-inner-loading>
    </div>
</template>

<script>
export default {
    name: 'ContainerManutencao',

    props: {
        url: {
            type: String,
            required: true,
            default: ''
        },

        parametros: {
            type: Object,
            required: true,
            default: () => ({})
        },

        registroNovo: {
            type: Boolean,
            required: true,
            default: false
        },

        validador: {
            type: Object,
            default: () => ({})
        },

        modificaParametros: {
            type: Function,
            default: null
        },

        idRegistro: {
            type: Number | String,
            default: 0
        },

        showCancelar: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            lowResolution: false,
            carregando: false
        }
    },

    computed: {
        id() {
            return this.idRegistro > 0 ? this.idRegistro : this.$route.params.id
        }
    },

    mounted() {
        this.$events.$on('lowResolution', (valor) => {
            this.lowResolution = valor
        })
    },

    methods: {
        $_voltar() {
            if (this.showCancelar) {
                this.$router.back()
            }
        },

        salvar() {
            if (this.$_validarParametros()) {
                this.carregando = true
                this.$_defineRequest()
                    .then(resposta => {
                        this.$notify.success({
                            title: 'Registro salvo',
                            message: 'O registro foi salvo com sucesso!',
                            duration: 5000
                        })
                        this.carregando = false
                        this.$_voltar()
                    })
                    .catch(erro => {
                        this.$notify.error({
                            title: 'Erro ao Salvar',
                            message: 'Não foi possível salvar o registro!',
                            apiError: erro
                        })
                        this.carregando = false
                    })
            }
        },

        $_defineRequest() {
            let parametros = JSON.parse(JSON.stringify(this.parametros))
            if (this.modificaParametros) {
                parametros = this.modificaParametros(parametros)
            }

            if (this.registroNovo) {
                return this.$axios
                    .post(this.url, parametros)
            }
            return this.$axios
                .put(`${this.url + this.id}/`, parametros)
        },

        $_validarParametros() {
            if (this.validador) {
                for (let campo in this.validador.$params) {
                    this.validador[campo].$touch()
                }
                return !this.validador.$error
            }
            return true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
