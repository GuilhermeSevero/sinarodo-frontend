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
            url-base="/premiacoes/"
            chave="id"
            sort-padrao="pedido"
            :colunas="colunas"
            :selecionado="selecionado"
            :define-filtros="$_defineFiltros"
        />
    </q-page>
</template>

<script>
import FilterBox from '../components/FilterBox'
import DataTable from '../components/DataTable'

export default {
    name: 'PagePremiacoes',

    components: {
        FilterBox,
        DataTable
    },

    data() {
        return {
            filtros: {

            },
            dados: [],
            colunas: []
        }
    },

    methods: {
        $_defineFiltros(config) {
            config.params.expand = '~all'
            return config
        },

        $_limparFiltros() {
            this.filtros = {
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
