<template>
    <q-page class="layout-page">
        <div
            v-if="dados"
            class="c-container-detalhes group row"
        >
            <div class="col-12 row c-container-dados">
                <div class="col-lg-5">
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

                <div class="col-lg-6">
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
                    class="col-12 row q-my-md"
                >
                    <div class="c-header-dados q-headline col-12">Nota Final: {{ dados.nota_final }}</div>
                    <div class="col-12">
                        <div class="c-dados"><span class="c-titulo-dados q-subheading">Observação:</span> {{ dados.observacao }}</div>
                    </div>
                </div>
            </div>
        </div>
        <q-table
            ref="table"
            color="primary"
            title="Pontuações por Categorias"
            :data="dados ? dados.premiacoes : []"
            :columns="colunas"
            row-key="id"
            :rows-per-page-options="[5, 10, 20, 50, 100]"
            binary-state-sort
        />
    </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
    name: 'PagePremiacao',

    data() {
        return {
            dados: null,

            colunas: [
                {
                    name: 'ano_periodo',
                    required: true,
                    label: 'Ano',
                    align: 'left',
                    field: 'ano_periodo',
                    sortable: true
                },
                {
                    name: 'mes_periodo',
                    required: true,
                    label: 'Mês',
                    align: 'left',
                    field: 'mes_periodo',
                    sortable: true
                },
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
                },
                {
                    name: 'dias_em_campo',
                    required: true,
                    label: 'Dias em Campo',
                    align: 'center',
                    field: 'dias_em_campo',
                    sortable: true
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

        $_buscarDados() {
            this.$axios
                .get(`/usuario_obra/${this.idUsuarioObra}/`, {
                    params: {
                        expand: '~all'
                    }
                })
                .then(({ data }) => {
                    this.dados = data
                })
                .catch(erro => {
                    this.$notify.error({
                        title: 'Erro ao buscar dados',
                        message: 'Erro ao executar comando no banco de dados.',
                        apiError: erro
                    })
                    this.$router.back()
                })
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
