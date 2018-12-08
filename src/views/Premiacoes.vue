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
                                float-label-from="Obra lançada em"
                                type="date"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-6">
                        <q-field class="g-form-filtro-field">
                            <datetime-range
                                id="dtrInicion"
                                v-model="filtros.inicio"
                                float-label-from="Obra iniciou em"
                                type="date"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-6">
                        <q-field class="g-form-filtro-field">
                            <datetime-range
                                id="dtrFim"
                                v-model="filtros.fim"
                                float-label-from="Obra finalizou em"
                                type="date"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-6">
                        <q-field class="g-form-filtro-field">
                            <q-input
                                id="inpCPF"
                                v-model="filtros.cpfUsuario"
                                float-label="CPF Usuário"
                                clearable
                                placeholder="000.000.000-00"
                                v-mask="'###.###.###-##'"
                                :autofocus="true"
                                @keyup.enter="props.onKeyUp"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-6">
                        <q-field class="g-form-filtro-field">
                            <q-input
                                id="inpMatricula"
                                v-model="filtros.matriculaUsuario"
                                float-label="Matrícula Usuário"
                                v-mask="'############'"
                                clearable
                                placeholder="Ex: 78455"
                                @keyup.enter="props.onKeyUp"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-6">
                        <q-field class="g-form-filtro-field">
                            <q-input
                                id="inpNome"
                                v-model="filtros.nomeUsuario"
                                float-label="Nome Usuário"
                                clearable
                                @keyup.enter="props.onKeyUp"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-6">
                        <q-field class="g-form-filtro-field g-checkbox-field">
                            <small>Mostrar</small>
                            <div class="g-checkbox-group row justify-start">
                                <q-checkbox
                                    id="chkAdmin"
                                    class="col-md-6"
                                    v-model="filtros.encarregado"
                                    label="Somente encarregado"
                                    :val="1"
                                />
                            </div>
                        </q-field>
                    </div>
                </div>
            </template>
        </filter-box>
        <data-table
            ref="table"
            :url-base="url"
            url-editar="/premiacoes/"
            chave="id"
            sort-padrao="obra__pedido"
            :decrescente="true"
            :colunas="colunas"
            :define-filtros="$_defineFiltros"
            ocultar-insert
            visualizar-somente
        />
    </q-page>
</template>

<script>
import { mask } from 'vue-the-mask'
import { date } from 'quasar'
import FilterBox from '../components/FilterBox'
import DataTable from '../components/DataTable'
import DatetimeRange from '../components/DatetimeRange'

export default {
    name: 'PagePremiacoes',

    components: {
        FilterBox,
        DataTable,
        DatetimeRange
    },

    directives: { mask },

    data() {
        return {
            url: '/usuario_obra/',

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
                },
                nomeUsuario: '',
                cpfUsuario: '',
                matriculaUsuario: '',
                encarregado: []
            },
            dados: [],
            colunas: [
                {
                    name: 'obra__pedido',
                    required: true,
                    label: 'Pedido',
                    align: 'left',
                    field: row => row.obra.pedido,
                    sortable: true
                },
                {
                    name: 'usuario__nome',
                    required: true,
                    label: 'Usuário',
                    align: 'left',
                    field: row => row.usuario.nome,
                    sortable: true
                },
                {
                    name: 'nota_final',
                    required: true,
                    label: 'Nota',
                    align: 'left',
                    field: 'nota_final'
                },
                {
                    name: 'observacao',
                    required: true,
                    label: 'Observação',
                    align: 'left',
                    field: 'observacao'
                },
                {
                    name: 'encarregado',
                    required: true,
                    label: 'Encarregado',
                    align: 'center',
                    field: 'encarregado',
                    format: val => val ? 'SIM' : 'NÃO'
                }
            ]
        }
    },

    methods: {
        $_defineFiltros(config) {
            config.params.expand = '~all'
            if (this.filtros.pedido) {
                config.params.obra_pedido = this.filtros.pedido
            }

            if (this.filtros.lancamento.from) {
                config.params.obra_data_lancamento__gte = date.formatDate(this.filtros.lancamento.from, 'YYYY-MM-DD')
            }
            if (this.filtros.lancamento.to) {
                config.params.obra_data_lancamento__lte = date.formatDate(this.filtros.lancamento.to, 'YYYY-MM-DD')
            }

            if (this.filtros.inicio.from) {
                config.params.obra_data_inicio__gte = date.formatDate(this.filtros.inicio.from, 'YYYY-MM-DD')
            }
            if (this.filtros.inicio.to) {
                config.params.obra_data_inicio__lte = date.formatDate(this.filtros.inicio.to, 'YYYY-MM-DD')
            }

            if (this.filtros.fim.from) {
                config.params.obra_data_final__gte = date.formatDate(this.filtros.fim.from, 'YYYY-MM-DD')
            }
            if (this.filtros.fim.to) {
                config.params.obra_data_final__lte = date.formatDate(this.filtros.fim.to, 'YYYY-MM-DD')
            }
            if (this.filtros.matriculaUsuario){
                config.params.usuario_matricula = this.filtros.matriculaUsuario
            }
            if (this.filtros.cpfUsuario){
                config.params.usuario_cpf = this.filtros.cpfUsuario.split('.').join('').split('-').join('')
            }
            if (this.filtros.nomeUsuario){
                config.params.search = this.filtros.nomeUsuario
            }

            if (this.filtros.encarregado.length) {
                config.params.encarregado = 'True'
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
                },
                nomeUsuario: '',
                cpfUsuario: '',
                matriculaUsuario: '',
                encarregado: []
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
