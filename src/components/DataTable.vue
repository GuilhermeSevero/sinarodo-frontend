<template>
    <q-table
        ref="table"
        color="primary"
        :title="titulo"
        :data="dados"
        :columns="colunas"
        :selection="selecao"
        :selected.sync="selecionado"
        :row-key="chave"
        :pagination.sync="paginacao"
        @request="$_request"
        :loading="carregando"
        :rows-per-page-options="[5, 10, 20, 50, 100]"
        binary-state-sort
    >
        <template
            slot="top-left"
            slot-scope="props"
        >
            <span
                v-if="titulo"
                class="q-title"
            >
                {{ titulo }}
            </span>
            <q-btn-group
                v-else
                class="btn-group"
                outline
            >
                <q-btn
                    v-if="!ocultarInsert"
                    color="primary"
                    label="Incluir"
                    icon="add"
                    push
                    @click="$_inserirClick"
                />
                <q-btn
                    color="primary"
                    :label="visualizarSomente ? 'Visualizar' : 'Alterar'"
                    :icon="visualizarSomente ? 'web' : 'create'"
                    :disable="selecionado.length === 0"
                    push
                    @click="$_alterarClick"
                />
                <q-btn
                    v-if="!ocultarDelete"
                    color="primary"
                    label="Excluir"
                    icon="clear"
                    :disable="selecionado.length === 0"
                    push
                    @click="$_excluirClick"
                />
            </q-btn-group>
        </template>
        <template
            slot="top-right"
            slot-scope="props"
        >
            <slot
                name="top-right"
                :selecionado="selecionado.length > 0"
                :chaveSelecionado="selecionado[0] ? selecionado[0][chave] : ''"
                :objetoSelecionado="selecionado[0]"
            />
        </template>
    </q-table>
</template>

<script>
export default {
    name: 'DataTable',

    props: {
        urlBase: {
            type: String,
            required: true,
            default: ''
        },

        colunas: {
            type: Array,
            required: true,
            default: () => []
        },

        titulo: {
            type: String,
            default: ''
        },

        selecao: {
            type: String,
            default: 'single'
        },

        chave: {
            type: String,
            default: 'id'
        },

        defineFiltros: {
            type: Function,
            default: null
        },

        sortPadrao: {
            type: String,
            default: 'id'
        },

        decrescente: {
            type: Boolean,
            default: false
        },

        urlInserir: {
            type: String,
            default: ''
        },

        urlEditar: {
            type: String,
            default: ''
        },

        ocultarInsert: {
            type: Boolean,
            default: false
        },

        ocultarDelete: {
            type: Boolean,
            default: false
        },

        visualizarSomente: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            carregando: false,
            selecionado: [],
            dados: [],
            paginacao: {
                page: 1,
                rowsNumber: 10,
                sortBy: this.sortPadrao,
                descending: this.decrescente
            },
            suprimirErro: false
        }
    },

    destroyed() {
        this.suprimirErro = true
    },

    methods: {
        pesquisar() {
            this.$_request({ pagination: this.paginacao })
        },

        $_request(props) {
            this.carregando = true
            this.paginacao = props.pagination

            this.$axios
                .get(this.urlBase, this.$_configuraRequest(props.pagination))
                .then(({ data, headers }) => {
                    let table = this.$refs.table
                    table.sortMethod(data, props.pagination.sortBy, props.pagination.descending)

                    this.paginacao.rowsNumber = headers['x-total']

                    this.dados = data
                    this.carregando = false
                })
                .catch(erro => {
                    this.carregando = false
                    if (!this.suprimirErro) {
                        this.$notify.error({
                            title: 'Erro ao realizar a consulta',
                            message: 'Não foi possível carregar os dados',
                            apiError: erro
                        })
                    }
                })
        },

        $_configuraRequest(paginacao) {
            let { page, rowsPerPage, sortBy, descending } = paginacao

            let config = {
                params: {
                    page: page,
                    per_page: rowsPerPage,
                    sort: `${sortBy}${(descending ? '-' : '')}`
                }
            }

            if (this.defineFiltros) {
                config = this.defineFiltros(config)
            }
            return config
        },

        $_inserirClick() {
            this.$router.push(this.urlInserir ? this.urlInserir : `${this.urlBase}0`)
        },

        $_alterarClick() {
            this.$router.push(`${this.urlEditar ? this.urlEditar : this.urlBase}${this.selecionado[0][this.chave]}`)
        },

        $_excluirClick() {
            this.$confirm('Excluir?', 'Deseja excluir o registro selecionado?')
                .then(resposta => {
                    if (resposta) {
                        this.carregando = true
                        this.$axios
                            .delete(`${this.urlBase}${this.selecionado[0][this.chave]}/`)
                            .then(resposta => {
                                this.$notify.success({
                                    title: 'Registro excluído',
                                    message: 'O registro foi excluído com sucesso!',
                                    duration: 5000
                                })
                                this.pesquisar()
                            })
                            .catch(erro => {
                                if (!this.suprimirErro) {
                                    this.$notify.error({
                                        title: 'Erro ao Excluir',
                                        message: 'Não foi possível excluir o registro!',
                                        apiError: erro
                                    })
                                }
                                this.carregando = false
                            })
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
