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
                                id="inpNomeUsuario"
                                v-model="filtros.nomeUsuario"
                                float-label="Nome Usuário"
                                clearable
                                :autofocus="true"
                                @keyup.enter="props.onKeyUp"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-6">
                        <q-field class="g-form-filtro-field">
                            <datetime-range
                                id="dtrData"
                                v-model="filtros.data"
                                float-label-from="Gravada em"
                                type="date"
                            />
                        </q-field>
                    </div>
                </div>
            </template>
        </filter-box>
        <data-table
            ref="table"
            url-base="/logs/"
            chave="id"
            sort-padrao="data_hora"
            :decrescente="true"
            :colunas="colunas"
            :define-filtros="$_defineFiltros"
            ocultar-insert
            ocultar-delete
            visualizar-somente
        />
    </q-page>
</template>

<script>
import { date } from 'quasar'
import FilterBox from '../components/FilterBox'
import DataTable from '../components/DataTable'
import DatetimeRange from '../components/DatetimeRange'

export default {
    name: 'PageLogs',

    components: {
        FilterBox,
        DataTable,
        DatetimeRange
    },

    data() {
        return {
            filtros: {
                nomeUsuario: '',
                data: {
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
                    name: 'usuario__nome',
                    required: true,
                    label: 'Usuário',
                    align: 'left',
                    field: (row) => row.usuario.nome,
                    sortable: true
                },
                {
                    name: 'data_hora',
                    required: true,
                    label: 'Data Modificação',
                    align: 'left',
                    field: 'data_hora',
                    sortable: true,
                    format: val => date.formatDate(val, 'DD/MM/YYYY HH:mm:ss')
                }
            ]
        }
    },

    methods: {
        $_defineFiltros(config) {
            config.params.expand = 'usuario'
            config.params.model = 'configuracoes'
            config.params.tipo = 'I'

            if (this.filtros.nomeUsuario) {
                config.params.search = this.filtros.nomeUsuario
            }

            if (this.filtros.data.from) {
                config.params.data_hora__gte = date.formatDate(this.filtros.data.from, 'YYYY-MM-DD')
            }
            if (this.filtros.data.to) {
                config.params.data_hora__lte = date.formatDate(this.filtros.data.to, 'YYYY-MM-DD')
            }
            return config
        },

        $_aplicarFiltros() {
            this.$refs.table.pesquisar()
        },

        $_limparFiltros() {
            this.filtros = {
                nomeUsuario: '',
                data: {
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
