<template>
    <q-modal
        id="modDiminuirDiasEmCampo"
        ref="modal"
        class="c-q-modal-fk"
        :content-css="{
            minWidth: '50vw',
            minHeight: '300px'
        }"
    >
        <q-modal-layout
            class="mdLayout no-border"
            header-class="no-border no-shadow"
            :header-style="{
                'min-height': lowResolution ? '80px' : '60px',
                'height': lowResolution ? '80px' : '60px',
                'margin-bottom': '10px'
            }"
        >
            <div slot="header">
                <q-toolbar>
                    <div class="c-header-fk col-md-7 col-xs-6">
                        <div class="q-title">{{ titulo }}</div>
                    </div>
                    <div class="row justify-end col-md-5 col-xs-6">
                        <q-btn
                            id="btnLBConfirmInner"
                            icon="done"
                            flat
                            round
                            size="lg"
                            @click="$_confirmar"
                        />
                        <q-btn
                            id="btnLBCloseInner"
                            ref="ttCancelar"
                            icon="cancel"
                            flat
                            round
                            size="lg"
                            @click="$refs.modal.hide()"
                        />
                    </div>
                </q-toolbar>
            </div>
            <div class="c-container-dados col-sm-4">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Selecione o período"
                    :error="$v.periodoSelecionado.$error"
                >
                    <q-select
                        id="selPeriodos"
                        v-model="periodoSelecionado"
                        float-label="Períodos"
                        clearable
                        :options="periodosdefinidos"
                        @blur="$v.periodoSelecionado.$touch"
                    />
                </q-field>
            </div>
            <div class="c-container-dados col-sm-4">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite o número de dias entre 1 e 30"
                    :error="$v.quantidadeDias.$error"
                >
                    <q-input
                        id="inQuantidadeDias"
                        v-model="quantidadeDias"
                        float-label="Quantidade de dias"
                        type="number"
                        :decimals="0"
                        clearable
                        @blur="$v.quantidadeDias.$touch"
                    />
                </q-field>
            </div>
        </q-modal-layout>
        <q-inner-loading :visible="carregando">
            <q-spinner
                size="50px"
                color="primary"
            />
        </q-inner-loading>
    </q-modal>
</template>

<script>
import { required, minValue, maxValue } from 'vuelidate/lib/validators'

export default {
    name: 'ModalDiminuirDiasTrabalhados',

    props: {
        periodos: {
            type: Array,
            default: () => []
        },

        idUsuarioObras: {
            type: Number,
            default: NaN
        }
    },

    data() {
        return {
            titulo: `Diminuir dias em campo do usuário`,

            lowResolution: false,

            url: '/usuario_obra/',

            carregando: false,

            periodosdefinidos: [],

            periodoSelecionado: {},

            quantidadeDias: 1
        }
    },

    validations: {
        periodoSelecionado: { required },
        quantidadeDias: {
            required,
            minValue: minValue(1),
            maxValue: maxValue(30)
        }
    },

    mounted() {
        this.$events.$on('lowResolution', (valor) => {
            this.lowResolution = valor
        })
    },

    methods: {
        open() {
            this.quantidadeDias = 1
            this.periodosdefinidos = this.periodos.map(element => ({
                label: `${element.mes_periodo}/${element.ano_periodo} - ${element.dias_em_campo} dias em campo`,
                value: element
            }))
            this.$refs.modal.show()
        },

        $_confirmar() {
            this.$v.$touch()
            if (!this.$v.$error) {
                if (this.quantidadeDias >= this.periodoSelecionado.dias_em_campo) {
                    this.$notify.warning({
                        title: 'Quantidade de Dias Inválido!',
                        message: 'A quantidade de dias deve ser menor que o total de dias em campo.',
                        duration: 5000
                    })
                } else {
                    this.$_diminuirDias({
                        quantidadeDias: this.quantidadeDias,
                        periodo: this.periodoSelecionado
                    })
                    this.$refs.modal.hide()
                }
            }
        },

        $_diminuirDias({ quantidadeDias, periodo }) {
            if (this.idUsuarioObras) {
                this.carregando = true
                this.$axios
                    .patch(`${this.url}${this.idUsuarioObras}/diminuir_dias_em_campo/`, {
                        mes_periodo: periodo.mes_periodo,
                        ano_periodo: periodo.ano_periodo,
                        dias: quantidadeDias
                    })
                    .then(() => {
                        this.$notify.success({
                            title: 'Dias em campo alterados',
                            message: `Você diminuio ${quantidadeDias} dias em campo.`,
                            duration: 3000
                        })
                        this.carregando = false
                        this.$emit('diasDiminuidos')
                    })
                    .catch(erro => {
                        this.$notify.error({
                            title: 'Erro ao Alterar',
                            message: 'Não foi possível diminuir os dias em campo!',
                            apiError: erro
                        })
                        this.carregando = false
                    })
            } else {
                this.$notify.warning({
                    title: 'Registro não selecionado!',
                    message: 'Selecione um registro para diminuir os dias trabalhados.',
                    duration: 3000
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.c-container-dados {
    margin: 0px;
    width: 100%;
    padding: 10px 5px 0px 20px;
    font-size: 1.2rem;
}
</style>
