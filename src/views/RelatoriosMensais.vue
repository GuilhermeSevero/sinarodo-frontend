<template>
    <q-page class="layout-page">
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
                    icon="print"
                    label="Imprimir"
                    @click="$_imprimirRelatorio"
                />
            </q-btn-group>
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
        $_imprimirRelatorio() {
            this.$v.$touch()
            if (!this.$v.$error) {
                this.$router.push(`/relatorios/mensais/${this.mes}/${this.ano}`)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
