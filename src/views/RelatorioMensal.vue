<template>
    <div
        :class="{
            'layout-page': $q.platform.is.mobile
        }"
    >
        <q-table
            id="tbRelatorioMensal"
            :title="titulorelatorio"
            :data="dados"
            :columns="colunas"
            hide-bottom
            :pagination="{
                rowsNumber: 0
            }"
        />
        <br>
        <p>
            <center>
                <table border="0">
                    <tr>
                        <font
                            size="5"
                            face="Arial"
                        >
                            Premiação total paga: <font color="red">R$ {{ premioTotal }}</font>
                        </font>
                    </tr>
                </table>
            </center>
        </p>
        <template v-if="$q.platform.is.desktop">
            <br><br><br><br>
            <p>
                <center>
                    <table border="0">
                        <tr>
                            <td>
                                <center>
                                    <hr
                                        align="center"
                                        width="300"
                                        size="1"
                                        color="black"
                                    >
                                    Direção Operacional
                                </center>
                            </td>
                            &nbsp; &nbsp;
                            <td>
                                <center>
                                    <hr
                                        align="center"
                                        width="300"
                                        size="1"
                                        color="black"
                                    >
                                    Gerente de Produção / Apontador
                                </center>
                            </td>
                        </tr>
                    </table>
                </center>
            </p>
        </template>
    </div>

</template>

<script>
export default {
    name: 'RelatorioMensal',

    data() {
        return {
            premioTotal: 0,
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
                },
                {
                    name: 'valor',
                    label: 'Prêmio (R$)',
                    align: 'left',
                    field: 'valor_premio',
                    format: val => `R$ ${val.toFixed(2)}`
                }
            ]
        }
    },

    computed: {
        mesPeriodo() {
            return this.$route.params.mes
        },

        anoPeriodo() {
            return this.$route.params.ano
        },

        titulorelatorio() {
            return `Relatório Mensal - ${this.mesPeriodo}/${this.anoPeriodo}`
        }

    },

    created() {
        this.$_buscarDados()
    },

    methods: {
        $_buscarDados() {
            this.$axios
                .get('/premiacoes/relatorio_mensal/', {
                    params: {
                        mes: this.mesPeriodo,
                        ano: this.anoPeriodo
                    }
                })
                .then(({ data }) => {
                    this.dados = data
                    this.premioTotal = data.reduce((soma, atual) => {
                        return soma + atual.valor_premio
                    }, 0).toFixed(2)

                    if (this.$q.platform.is.desktop) {
                        this.$nextTick(() => {
                            print()
                            this.$router.back()
                        })
                    }
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

<style lang="scss" scoped>
</style>
