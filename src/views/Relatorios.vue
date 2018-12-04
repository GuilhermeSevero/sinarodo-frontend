<template>
    <q-page class="layout-page">
        <div class="row">
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite o mês do período"
                    :error="$v.mes.$error"
                >
                    <q-select
                        id="selMes"
                        v-model="mes"
                        float-label="Mês período"
                        clearable
                        :options="meses"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite o ano do período"
                    :error="$v.ano.$error"
                >
                    <q-select
                        id="selAno"
                        v-model="ano"
                        float-label="Ano período"
                        clearable
                        :options="anos"
                    />
                </q-field>
            </div>
            <div class="col-mmd-6">
                <q-btn-group
                    class="btn-group q-my-xs"
                    outline
                >
                    <q-btn
                        id="btnImprimir"
                        push
                        color="primary"
                        icon="assessment"
                        label="Mensal"
                        @click="$_imprimirRelatorioMensal"
                    />
                    <q-btn
                        id="btnImprimir"
                        push
                        color="primary"
                        icon="assessment"
                        label="Anual"
                        @click="$_imprimirRelatorioAnual"
                    />
                </q-btn-group>
            </div>
        </div>
    </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'PageRelatoriosMensais',

    data() {
        return {
            mes: (new Date()).getMonth() + 1,
            ano: (new Date()).getFullYear(),
            meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(element => ({
                value: element,
                label: element
            }))
        }
    },

    computed: {
        anos() {
            let anoCorrente = (new Date()).getFullYear()
            let lista = []
            for (let index = 2010; index < anoCorrente + 10; index++) {
                lista.push({
                    value: index,
                    label: index
                })
            }
            return lista
        }
    },

    validations: {
        mes: { required },
        ano: { required }
    },

    methods: {
        $_imprimirRelatorioMensal() {
            this.$v.$touch()
            if (!this.$v.$error) {
                this.$router.push(`/relatorios/mensal/${this.mes}/${this.ano}`)
            }
        },

        $_imprimirRelatorioAnual() {
            this.$v.ano.$touch()
            if (!this.$v.ano.$error) {
                this.$router.push(`/relatorios/anual/${this.ano}`)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
