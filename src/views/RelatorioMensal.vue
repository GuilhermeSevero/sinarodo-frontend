<template>
    <div>
        <q-table
            :title="titulorelatorio"
            :data="dados"
            :columns="colunas"
            :pagination="{rowsNumber: 0}"
            :rows-per-page-options="[]"
        />
        <p><br><br><br>
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
    name: 'RelatorioMensal',

    data() {
        return {
            dados: [],
            colunas: [
                {
                    name: 'nome',
                    label: 'Nome',
                    align: 'left',
                    field: item => item.usuario.nome

                },
                {
                    name: 'nota',
                    label: 'Nota',
                    align: 'left',
                    field: 'nota_media'

                },
                {
                    name: 'dias',
                    label: 'Dias Trabalhados',
                    align: 'left',
                    field: 'dias_em_campo'

                },
                {
                    name: 'valor',
                    label: 'Prêmio (R$)',
                    align: 'left',
                    field: 'valor_premio',
                    format: val => `R$ ${val}`

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
            return 'Relatório Mensal ' + this.mesPeriodo + '/' + this.anoPeriodo
        }

    },

    created() {
        this.$_buscarDados()
    },

    methods: {
        $_buscarDados() {
            this.dados = [
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                },
                {
                    usuario: {
                        nome: 'Guilherme',
                        email: 'guilherme@teste.com.br'
                    },
                    nota_media: 9.5,
                    dias_em_campo: 16,
                    valor_premio: 800.0
                }
            ]
            // this.$http
            //     .get('/relatorios/premiacoes/mensal/', {
            //         params: {
            //             mes: this.mesPeriodo,
            //             ano: this.anoPeriodo
            //         }
            //     })
            //     .then(resposta => {
            //         this.dados = resposta.data
            //     })
            //     .catch(erro => {

            //     })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
