<template>
    <div>
        <q-table
            :title="tituloRelatorio"
            :data="dados"
            :columns="colunas"
            :pagination="{ rowsNumber: 0 }"
            :rows-per-page-options="[]"
            :pagination-label="(start, end, total) => ''"
        />
        <br>
        <br><br><br><br>
        <p>
            <center> <table border="0">
                <tr>
                    <td> <center> <hr
                        align="center"
                        width="300"
                        size="1"
                        color="black">
                        Direção Operacional
                    </center></td>&nbsp; &nbsp;

                    <td> <center> <hr
                        align="center"
                        width="300"
                        size="1"
                        color="black">
                        Gerente de Produção / Apontador
                    </center></td>

            </tr></table> </center>

        </p>
    </div>

</template>

<script>
export default {
    name: 'RelatorioAnual',

    data() {
        return {
            dados: [],
            colunas: [
                {
                    name: 'id',
                    label: 'Código',
                    align: 'left',
                    field: row => row.usuario.id
                },
                {
                    name: 'usuario__matricula',
                    label: 'Matrícula',
                    align: 'left',
                    field: row => row.usuario.matricula
                },
                {
                    name: 'usuario__nome',
                    label: 'Colaborador',
                    align: 'left',
                    field: row => row.usuario.nome
                },
                {
                    name: 'nota',
                    label: 'Nota Média',
                    align: 'left',
                    field: 'nota_media'
                },
                {
                    name: 'dias',
                    label: 'Dias em Campo',
                    align: 'center',
                    field: 'dias_em_campo'
                }
            ]
        }
    },

    computed: {
        anoPeriodo() {
            return this.$route.params.ano
        },

        tituloRelatorio() {
            return `Relatório Anual - ${this.anoPeriodo}`
        }

    },

    created() {
        this.$_buscarDados()
    },

    methods: {
        $_buscarDados() {
            this.$axios
                .get('/premiacoes/relatorio_anual/', {
                    params: {
                        ano: this.anoPeriodo
                    }
                })
                .then(({ data }) => {
                    this.dados = data

                    this.$nextTick(() => {
                        print()
                        this.$router.back()
                    })
                })
                .catch(erro => {
                    this.$notify.error({
                        title: 'Erro na impressão',
                        message: 'Não foi possível realizar a impressão do relatório!',
                        apiError: erro
                    })
                    this.$router.back()
                })
        }
    }
}
</script>

<style lang="scss">
.q-table-bottom .q-table-control {
    display: none !important;
}
</style>
