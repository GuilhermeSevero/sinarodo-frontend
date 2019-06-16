<template>
    <q-page class="layout-page">
        <div
            v-if="dados"
            class="c-container-detalhes group row"
        >
            <div class="col-12 row c-container-dados">
                <div class="col-md-5">
                    <div class="c-header-dados q-headline">Detalhes da Obra</div>
                    <div class="c-dados"><span class="c-titulo-dados q-subheading">Pedido:</span> {{ dados.obra.pedido }}</div>
                    <div
                        class="c-dados"
                    ><span class="c-titulo-dados q-subheading">Data Lançamento:</span> {{ formatDate(dados.obra.data_lancamento, 'DD/MM/YYYY') }}</div>
                    <div
                        class="c-dados"
                    ><span class="c-titulo-dados q-subheading">Data Inicio:</span> {{ formatDate(dados.obra.data_inicio, 'DD/MM/YYYY') }}</div>
                    <div
                        class="c-dados"
                    ><span class="c-titulo-dados q-subheading">Data Final:</span> {{ formatDate(dados.obra.data_final, 'DD/MM/YYYY') }}</div>
                    <div
                        class="c-dados"
                    ><span class="c-titulo-dados q-subheading">Observação:</span> {{ dados.obra.observacao }}</div>
                </div>

                <div class="col-md-6">
                    <template
                    >
                        <div class="c-header-dados q-headline">Informações do Usuário</div>
                        <div class="c-dados"><span class="c-titulo-dados q-subheading">Matrícula:</span> {{ dados.usuario.matricula }}</div>
                        <div class="c-dados"><span class="c-titulo-dados q-subheading">Nome:</span> {{ dados.usuario.nome }}</div>
                        <div class="c-dados"><span class="c-titulo-dados q-subheading">Apelido:</span> {{ dados.usuario.apelido }}</div>
                        <div class="c-dados"><span class="c-titulo-dados q-subheading">CPF:</span> {{ dados.usuario.cpf }}</div>
                        <div class="c-dados"><span class="c-titulo-dados q-subheading">e-mail:</span> {{ dados.usuario.email }}</div>
                        <div class="c-dados"><span class="c-titulo-dados q-subheading">Telefone:</span> {{ dados.usuario.telefone }}</div>
                    </template>
                </div>
                <div
                    class="col-12 row q-mt-md"
                >
                    <div class="col-md-7">
                        <div class="c-header-dados q-headline text-primary">Nota Final: {{ dados.nota_final }}</div>
                        <div class="c-dados"><span class="c-titulo-dados q-subheading">Observação:</span> {{ dados.observacao }}</div>
                        <q-btn
                            class="q-mt-md"
                            color="primary"
                            label="Diminuir dias em campo"
                            icon="date_range"
                            push
                            @click="$_showModalDiminuirDias"
                        />
                    </div>
                    <div
                        v-if="dados"
                        class="col-md-5 q-mt-md"
                    >
                        <q-table
                            title="Dias em campo"
                            :data="dados.periodos"
                            :columns="colunasPeriodos"
                            :rows-per-page-options="[0]"
                            hide-bottom
                        />
                    </div>
                </div>
            </div>
        </div>
        <hr class="q-hr q-my-lg">
        <data-table
            ref="table"
            url-base="/premiacoes/"
            titulo="Pontuação por Categorias"
            :colunas="colunas"
            row-chave="id"
            sort-padrao="categoria__descricao"
            :define-filtros="$_defineFiltrosPremiacoes"
            selecao="none"
        />
        <modal-diminuir-dias-em-campo
            v-if="dados"
            ref="modalDiminuirDiasEmCampo"
            :id-usuario-obras="dados.id"
            :periodos="dados.periodos"
            @diasDiminuidos="$_onDiasDiminuidos"
        />
    </q-page>
</template>

<script>
import { date } from 'quasar'
import DataTable from '../components/DataTable'
import ModalDiminuirDiasEmCampo from '../components/ModalDiminuirDiasEmCampo'

export default {
    name: 'PagePremiacao',

    components: {
        DataTable,
        ModalDiminuirDiasEmCampo
    },

    data() {
        return {
            dados: null,

            colunas: [
                // {
                //     name: 'ano_periodo',
                //     required: true,
                //     label: 'Ano',
                //     align: 'left',
                //     field: 'ano_periodo',
                //     sortable: true
                // },
                // {
                //     name: 'mes_periodo',
                //     required: true,
                //     label: 'Mês',
                //     align: 'left',
                //     field: 'mes_periodo',
                //     sortable: true
                // },
                {
                    name: 'categoria__descricao',
                    required: true,
                    label: 'Categoria',
                    align: 'left',
                    field: row => row.categoria.descricao,
                    sortable: true
                },
                {
                    name: 'categoria__peso',
                    required: true,
                    label: 'Peso',
                    align: 'left',
                    field: row => row.categoria.peso,
                    sortable: true,
                    format: value => `${value}%`
                },
                {
                    name: 'nota',
                    required: true,
                    label: 'Nota',
                    align: 'left',
                    field: 'nota',
                    sortable: true
                }
            ],
            colunasPeriodos: [
                {
                    name: 'ano_periodo',
                    required: true,
                    label: 'Ano',
                    align: 'left',
                    field: 'ano_periodo'
                },
                {
                    name: 'mes_periodo',
                    required: true,
                    label: 'Mês',
                    align: 'left',
                    field: 'mes_periodo'
                },
                {
                    name: 'dias_em_campo',
                    required: true,
                    label: 'Dias em Campo',
                    align: 'center',
                    field: 'dias_em_campo'
                }
            ]
        }
    },

    computed: {
        idUsuarioObra() {
            return this.$route.params.id
        }
    },

    mounted() {
        this.$_buscarDados()
    },

    methods: {
        formatDate: (data, formato) => date.formatDate(data, formato),

        $_defineFiltrosPremiacoes(config) {
            config.params.id_usuario_obra = this.idUsuarioObra
            config.params.apenas_categorias = 'True'
            config.params.expand = '~all'
            return config
        },

        $_buscarDados() {
            this.$axios
                .get(`/usuario_obra/${this.idUsuarioObra}/`, {
                    params: {
                        expand: '~all'
                    }
                })
                .then(({ data }) => {
                    this.dados = data
                    this.$nextTick(() => {
                        this.$refs.table.pesquisar()
                    })
                })
                .catch(erro => {
                    this.$notify.error({
                        title: 'Erro ao buscar dados',
                        message: 'Erro ao executar comando no banco de dados.',
                        apiError: erro
                    })
                    this.$router.back()
                })
        },

        $_showModalDiminuirDias() {
            this.$refs.modalDiminuirDiasEmCampo.open()
        },

        $_onDiasDiminuidos() {
            this.$_buscarDados()
        }
    }
}
</script>

<style lang="scss" scoped>
.c-container-detalhes {
    .c-container-dados {
        margin: 5px 0 0 5px;
    }

    .c-header-dados {
        font-weight: bold;
        margin: 10px 0;
    }

    .c-dados {
        margin: 5px 0 0 10px;
    }

    .c-titulo-dados {
        font-weight: bold;
        margin-right: 10px;
    }
}
</style>
