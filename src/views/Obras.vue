<template>
    <q-page class="layout-page">
        <filter-box
            id="fboxRastreamento"
            v-model="filtros"
            :aplicar-filtros="$_aplicarFiltros"
            :limpar-filtros="$_limparFiltros"
        >
            <template slot-scope="props">
                <div
                    class="row justify-between no-margin no-padding"
                    style="width: 100%"
                >
                    <div class="col-sm-6">
                        <q-field class="g-form-filtro-field">
                            <q-input
                                id="inpPedido"
                                v-model="filtros.pedido"
                                float-label="Pedido"
                                clearable
                                v-mask="'###########'"
                                :autofocus="true"
                                @keyup.enter="props.onKeyUp"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-6">
                        <q-field class="g-form-filtro-field">
                            <datetime-range
                                id="dtrLancamento"
                                v-model="filtros.lancamento"
                                float-label-from="Lançada em"
                                type="date"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-6">
                        <q-field class="g-form-filtro-field">
                            <datetime-range
                                id="dtrInicion"
                                v-model="filtros.inicio"
                                float-label-from="Iniciou em"
                                type="date"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-6">
                        <q-field class="g-form-filtro-field">
                            <datetime-range
                                id="dtrFim"
                                v-model="filtros.fim"
                                float-label-from="Finalizou em"
                                type="date"
                            />
                        </q-field>
                    </div>
                </div>
            </template>
        </filter-box>
        <data-table
            ref="table"
            url-base="/obras/"
            url-inserir="/obras/novo/"
            chave="id"
            sort-padrao="pedido"
            :colunas="colunas"
            :define-filtros="$_defineFiltros"
        />
    </q-page>
</template>

<script>
import { date } from 'quasar'
import { mask } from 'vue-the-mask'
import FilterBox from '../components/FilterBox'
import DataTable from '../components/DataTable'
import DatetimeRange from '../components/DatetimeRange'

export default {
    name: 'PageObras',

    components: {
        FilterBox,
        DataTable,
        DatetimeRange
    },

    directives: { mask },

    data() {
        return {
            filtros: {
                pedido: '',
                lancamento: {
                    from: '',
                    to: ''
                },
                inicio: {
                    from: '',
                    to: ''
                },
                fim: {
                    from: '',
                    to: ''
                }
            },
            dados: [],
            colunas: [
                {
                    name: 'id',
                    required: true,
                    label: 'Código',
                    align: 'left',
                    field: 'id',
                    sortable: true
                },
                {
                    name: 'pedido',
                    required: true,
                    label: 'Pedido',
                    align: 'left',
                    field: 'pedido',
                    sortable: true
                },
                {
                    name: 'data_lancamento',
                    required: true,
                    label: 'Lançamento',
                    align: 'left',
                    field: 'data_lancamento',
                    sortable: true,
                    format: val => date.formatDate(val, 'DD/MM/YYYY')
                },
                {
                    name: 'data_inicio',
                    required: true,
                    label: 'Inicio',
                    align: 'left',
                    field: 'data_inicio',
                    sortable: true,
                    format: val => date.formatDate(val, 'DD/MM/YYYY')
                },
                {
                    name: 'data_final',
                    required: true,
                    label: 'Fim',
                    align: 'left',
                    field: 'data_final',
                    sortable: true,
                    format: val => date.formatDate(val, 'DD/MM/YYYY')
                }
            ]
        }
    },

    methods: {
        $_defineFiltros(config) {
            if (this.filtros.pedido) {
                config.params.pedido = this.filtros.pedido
                return config
            }

            if (this.filtros.lancamento.from) {
                config.params.data_lancamento__gte = date.formatDate(this.filtros.lancamento.from, 'YYYY-MM-DD')
            }
            if (this.filtros.lancamento.to) {
                config.params.data_lancamento__lte = date.formatDate(this.filtros.lancamento.to, 'YYYY-MM-DD')
            }

            if (this.filtros.inicio.from) {
                config.params.data_inicio__gte = date.formatDate(this.filtros.inicio.from, 'YYYY-MM-DD')
            }
            if (this.filtros.inicio.to) {
                config.params.data_inicio__lte = date.formatDate(this.filtros.inicio.to, 'YYYY-MM-DD')
            }

            if (this.filtros.fim.from) {
                config.params.data_final__gte = date.formatDate(this.filtros.fim.from, 'YYYY-MM-DD')
            }
            if (this.filtros.fim.to) {
                config.params.data_final__lte = date.formatDate(this.filtros.fim.to, 'YYYY-MM-DD')
            }
            return config
        },

        $_aplicarFiltros() {
            this.$refs.table.pesquisar()
        },

        $_limparFiltros() {
            this.filtros = {
                pedido: '',
                lancamento: {
                    from: '',
                    to: ''
                },
                inicio: {
                    from: '',
                    to: ''
                },
                fim: {
                    from: '',
                    to: ''
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
