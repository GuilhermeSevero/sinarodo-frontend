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
                    <div class="c-header-fk col-sm-7">
                        <div class="q-title">{{ titulo }}</div>
                    </div>
                    <div class="row justify-end col-sm-5">
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
        <q-inner-loading :visible="loading">
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
        }
    },

    data() {
        return {
            titulo: `Diminuir dias em campo do usuário`,

            lowResolution: false,

            loading: false,

            periodosdefinidos: [],

            periodoSelecionado: {},

            quantidadeDias: 1
        }
    },

    watch: {
        periodos(value) {
            this.periodosdefinidos = value.map(element => ({
                label: `${element.mes_periodo}/${element.ano_periodo} - ${element.dias_em_campo} dias em campo`,
                value: element
            }))
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
            this.$refs.modal.show()
        },

        $_confirmar() {
            this.$v.$touch()
            if (!this.$v.$error) {
                alert('Finalizando implementação!')
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
