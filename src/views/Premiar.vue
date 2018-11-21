<template>
    <q-page class="layout-page">
        <p
            v-for="usuario in parametros.usuarios"
            :key="parametros.usuarios.indexOf(usuario)"
        >
            {{ usuario.nome }}
        </p>
        <q-stepper
            ref="stepper"
            v-model="stepper"
            alternative-labels
            contractable
            @step="$_onStep"
        >
            <!-- Passo 01 -->
            <q-step
                title="Manutenção da Obra"
                name="obra"
                default
                :error="erroStep1"
            >
                <q-field
                    class="g-form-filtro-field"
                    :count="20"
                >
                    <q-input
                        id="inpPedido"
                        v-model="parametros.obra.pedido"
                        float-label="Pedido"
                        maxlength="20"
                        disable
                    />
                </q-field>
                <q-field
                    class="g-form-filtro-field"
                >
                    <q-datetime
                        id="dateInicio"
                        v-model="parametros.obra.data_inicio"
                        type="date"
                        float-label="Data Inicio"
                        clearable
                        format="DD/MM/YYYY"
                        disable
                    />
                </q-field>
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite a data do fim da obra"
                    :error="$v.parametros.obra.data_final.$error"
                >
                    <q-datetime
                        id="dateFinal"
                        v-model="parametros.obra.data_final"
                        type="date"
                        float-label="Data Final"
                        clearable
                        format="DD/MM/YYYY"
                        :disable="!podeAlterarDataFinal"
                        @blur="$v.parametros.obra.data_final.$touch"
                    />
                </q-field>
                <q-field
                    class="g-form-filtro-field"
                    :count="300"
                >
                    <q-input
                        id="inpObservacao"
                        v-model="parametros.obra.observacao"
                        type="textarea"
                        float-label="Observação"
                        maxlength="300"
                        disable
                    />
                </q-field>
            </q-step>

            <!-- Passo 02 -->
            <q-step
                title="Usuarios"
                name="usuarios"
                :error="erroStep2"
            >
                <q-field
                    class="g-form-filtro-field"
                    error-label="Selecione os usuários"
                    :error="$v.parametros.usuarios.$error"
                >
                    <q-select
                        id="selUsuarios"
                        v-model="parametros.usuarios"
                        float-label="Usuários"
                        clearable
                        filter
                        autofocus-filter
                        multiple
                        chips
                        filter-placeholder="Filtrar Usuário"
                        :options="usuarios"
                    />
                </q-field>
                <q-field
                    class="g-form-filtro-field"
                    :count="300"
                >
                    <q-input
                        id="inpObservacaoPremiacao"
                        v-model="parametros.premiacao_observacao"
                        type="textarea"
                        float-label="Observação da Premiação"
                        maxlength="300"
                        clearable
                    />
                </q-field>
            </q-step>

            <!-- Passo 03 -->
            <q-step
                title="Premiação"
                name="premiacao"
                :error="erroStep3"
            >
                <q-list highlight>
                    <q-list-header>Defina a pontuação dos usuários selecionados</q-list-header>
                    <q-item
                        v-for="categoria in parametros.categorias"
                        :key="parametros.categorias.indexOf(categoria)"
                    >
                        <q-item-side>
                            <q-item-tile>
                                {{ `${categoria.descricao} (${categoria.peso}%)` }}
                            </q-item-tile>
                        </q-item-side>
                        <q-item-main>
                            <q-rating
                                v-model="categoria.nota"
                                :min="1"
                                :max="3"
                                size="30px"
                            />
                        </q-item-main>
                    </q-item>
                </q-list>
            </q-step>

            <q-stepper-navigation>
                <q-btn
                    id="btnVoltar"
                    push
                    icon="clear"
                    :label="stepper === 'obra' ? 'Cancelar' : 'Voltar'"
                    @click="$_voltar"
                />
                <q-btn
                    id="btnProximo"
                    push
                    color="primary"
                    icon="done"
                    :label="stepper === 'premiacao' ? 'Salvar' : 'Próximo'"
                    @click="$_proximo"
                />
            </q-stepper-navigation>
        </q-stepper>
        <q-inner-loading :visible="carregando">
            <q-spinner
                size="50px"
                color="primary"
            />
        </q-inner-loading>
    </q-page>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { date } from 'quasar'

export default {
    name: 'PagePremiar',

    data() {
        return {
            url: '/obras/',

            carregando: false,

            stepper: 'obras',

            usuarios: [],

            selecionado: [],

            parametros: {
                obra: {
                    id: null,
                    pedido: null,
                    data_lancamento: null,
                    data_inicio: null,
                    data_final: null,
                    observacao: ''
                },
                usuarios: [],
                categorias: [],
                premiacao_observacao: ''
            }
        }
    },

    computed: {
        idObra() {
            return this.$route.params.id_obra
        },

        podeAlterarDataFinal() {
            return !this.parametros.obra.data_final
        },

        erroStep1() {
            return this.$v.parametros.obra.$error
        },

        erroStep2() {
            return this.$v.parametros.usuarios.$error
        },

        erroStep3() {
            return false
        }
    },

    validations: {
        parametros: {
            obra: {
                data_final: { required }
            },
            usuarios: {
                required,
                minLength: minLength(1)
            }
        }
    },

    mounted() {
        this.$_buscarDados()
    },

    methods: {
        $_modificaParametros(parametros) {
            if (parametros.obra.data_lancamento) {
                parametros.obra.data_lancamento = date.formatDate(this.parametros.obra.data_lancamento, 'YYYY-MM-DD')
            }
            if (parametros.obra.data_inicio) {
                parametros.obra.data_inicio = date.formatDate(this.parametros.obra.data_inicio, 'YYYY-MM-DD')
            }
            if (parametros.obra.data_final) {
                parametros.obra.data_final = date.formatDate(this.parametros.obra.data_final, 'YYYY-MM-DD')
            }

            parametros.categorias.forEach(element => {
                switch (element.nota) {
                case 1:
                    element.nota = 0
                    break
                case 2:
                    element.nota = 5
                    break
                case 3:
                    element.nota = 10
                    break
                default:
                    element.nota = 0
                    break
                }
            })

            return parametros
        },

        $_onStep(stepAtual) {
            if (stepAtual === 'usuarios') {
                this.$v.parametros.$touch()
            } else if (stepAtual === 'premiacao') {
                this.$v.parametros.usuarios.$touch()
            }
        },

        $_proximo() {
            if (this.stepper === 'premiacao') {
                this.$v.parametros.$touch()
                if (!this.$v.parametros.$error) {
                    this.carregando = true
                    let parametros = JSON.parse(JSON.stringify(this.parametros))
                    this.$axios
                        .post('/obras/premiacao/', this.$_modificaParametros(parametros))
                        .then(retorno => {
                            this.$notify.success({
                                title: 'Registro salvo',
                                message: 'A premiação foi salva com sucesso!',
                                duration: 5000
                            })
                            this.carregando = false
                            this.$router.back()
                        })
                        .catch(erro => {
                            this.$notify.error({
                                title: 'Erro ao Salvar',
                                message: 'Ocorreu um erro ao gravar as premiações!',
                                apiError: erro
                            })
                            this.carregando = false
                        })
                }
            } else {
                this.$refs.stepper.next()
            }
        },

        $_voltar() {
            if (this.stepper === 'obra') {
                this.$router.back()
            } else {
                this.$refs.stepper.previous()
            }
        },

        $_buscarDados() {
            Promise.all([
                this.$_buscarDadosObra(),
                this.$_buscarUsuarios(),
                this.$_buscaCategorias()
            ])
                .then(respostas => {
                    this.parametros.obra = respostas[0].data
                    this.stepper = this.podeAlterarDataFinal ? 'obra' : 'usuarios'

                    this.usuarios = respostas[1].data
                        .map(element => ({
                            label: `${element.matricula} - ${element.nome}`,
                            sublabel: `Função: ${element.funcao_1 ? element.funcao_1 : ''}${element.funcao_2 ? `/${element.funcao_2}` : ''}`,
                            stamp: element.apelido,
                            value: element.id
                        }))

                    this.parametros.categorias = respostas[2].data
                        .map(element => ({
                            id: element.id,
                            descricao: element.descricao,
                            peso: element.peso,
                            nota: 1
                        }))
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

        $_buscarDadosObra() {
            return this.$axios.get(`/obras/${this.$route.params.id_obra}/`)
        },

        $_buscarUsuarios() {
            this.usuarios = []
            this.selecionado = []
            return this.$axios
                .get('/usuarios/', {
                    params: {
                        per_page: 5000,
                        sort: 'nome'
                    }
                })
        },

        $_buscaCategorias() {
            this.parametros.categorias = []
            return this.$axios
                .get('/categorias/', {
                    params: {
                        per_page: 250,
                        sort: 'descricao'
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
