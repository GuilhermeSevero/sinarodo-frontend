<template>
    <q-page class="layout-page">
        <data-table
            ref="table"
            url-base="/categorias/"
            :colunas="colunas"
            chave="id"
            sort-padrao="descricao"
        />
    </q-page>
</template>

<script>
import { mask } from 'vue-the-mask'
import DataTable from '../components/DataTable'

export default {
    name: 'PageCategorias',

    components: {
        DataTable
    },

    directives: { mask },

    data () {
        return {
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
                    name: 'descricao',
                    required: true,
                    label: 'Descrição',
                    align: 'left',
                    field: 'descricao',
                    sortable: true
                },
                {
                    name: 'peso',
                    required: true,
                    label: 'Peso',
                    align: 'left',
                    field: 'peso',
                    sortable: true,
                    format: (value) => `${value}%`
                }
            ]
        }
    },

    mounted() {
        this.$refs.table.pesquisar()
    },

    methods: {
    }
}
</script>

<style lang="scss" scoped>

</style>
