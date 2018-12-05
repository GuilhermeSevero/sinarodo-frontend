<template>
    <q-page class="layout-page">
        <div class="row">
            <div class="col-md-6">
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
            <div class="col-md-6">
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
            <div class="col-12">
                <q-btn-group
                    class="btn-group q-my-xs"
                    outline
                >
                    <q-btn
                        id="btnImprimir"
                        push
                        color="primary"
                        icon="assessment"
                        label="Buscar"
                        @click="$_imprimirRelatorioUsuario"
                    />
                </q-btn-group>
            </div>
            <div
                v-if="dados"
                class="col-12 row justify-center"
            >
                <q-jumbotron>
                    <div class="q-display-2">{{ titulo }}</div>
                    <hr class="q-hr q-my-lg">
                    <div class="">
                        <div class="q-title q-mb-md">{{ diasEmCampo }}</div>
                        <div class="q-title q-mb-md">{{ notaMedia }}</div>
                        <div class="q-title q-mb-md">{{ valorPremio }}</div>
                    </div>
                </q-jumbotron>
            </div>
        </div>
    </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'

export default {
    name: 'PageRelatoriosMensais',

    directives: { mask },

    data() {
        return {
            mes: (new Date()).getMonth() + 1,
            ano: (new Date()).getFullYear(),
            meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(element => ({
                value: element,
                label: element
            })),
            dados: null
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
        },

        idUsuario() {
            return this.$login.usuarioLogado().id
        },

        titulo() {
            return `Dados em ${this.mes}/${this.ano}`
        },

        diasEmCampo() {
            return `Dias em campo: ${this.dados.dias_em_campo ? this.dados.dias_em_campo : 0}`
        },

        notaMedia() {
            return `Nota média: ${this.dados.nota_media ? this.dados.nota_media : 0}`
        },

        valorPremio() {
            return `Valor prêmio: ${this.dados.valor_premio ? this.dados.valor_premio : 0}`
        }
    },

    validations: {
        mes: { required },
        ano: { required }
    },

    methods: {
        $_imprimirRelatorioUsuario() {
            this.$v.$touch()
            if (!this.$v.$error) {
                this.$axios
                    .get('/premiacoes/relatorio_usuario/', {
                        params: {
                            ano: this.ano,
                            mes: this.mes,
                            usuario: this.idUsuario
                        }
                    })
                    .then(({ data }) => {
                        this.dados = data
                    })
                    .catch(erro => {
                        this.$notify.error({
                            title: 'Erro ao consultar',
                            message: 'Não foi possível realizar a consulta dos dados!',
                            apiError: erro
                        })
                    })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
