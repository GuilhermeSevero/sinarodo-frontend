<template>
    <q-page class="layout-page">
        <q-stepper
            ref="stepper"
            v-model="stepper"
            alternative-labels
            contractable
            @step="$_onStep"
        >
            <!-- Passo 01 -->
            <q-step
                title="Encarregado"
                name="encarregado"
                default
                :error="this.$v.parametros.encarregado.$error"
            >
                <q-field
                    class="g-form-filtro-field"
                    error-label="Selecione o encarregado da Obra"
                    :error="$v.parametros.encarregado.$error"
                >
                    <q-select
                        id="selEncarregado"
                        v-model="parametros.encarregado"
                        float-label="Encarregado"
                        clearable
                        filter
                        autofocus-filter
                        filter-placeholder="Filtrar Usuário"
                        :options="usuarios"
                        :disable="!podeAlterarEncarregado"
                    />
                </q-field>
            </q-step>

            <!-- Passo 02 -->
            <q-step
                title="Equipe"
                name="usuarios"
                :error="this.$v.parametros.usuarios.$error"
            >
                <q-field
                    class="g-form-filtro-field"
                    error-label="Selecione os colaboradores"
                    :error="$v.parametros.usuarios.$error"
                >
                    <q-select
                        id="selUsuarios"
                        v-model="parametros.usuarios"
                        float-label="Colaboradores"
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
                :error="false"
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

export default {
    name: 'PagePremiar',

    data() {
        return {
            carregando: false,

            stepper: 'obras',

            usuarios: [],

            podeAlterarEncarregado: true,

            parametros: {
                encarregado: null,
                usuarios: [],
                categorias: [],
                premiacao_observacao: ''
            }
        }
    },

    computed: {
        idObra() {
            return this.$route.params.id_obra
        }
    },

    validations: {
        parametros: {
            encarregado: { required },
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
            parametros.id_obra = this.idObra

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

            if (!this.podeAlterarEncarregado) {
                delete parametros.encarregado
            }

            return parametros
        },

        $_onStep(stepAtual) {
            if (stepAtual === 'usuarios') {
                this.$v.parametros.encarregado.$touch()
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
            if (this.stepper === 'encarregado') {
                this.$router.back()
            } else {
                this.$refs.stepper.previous()
            }
        },

        $_buscarDados() {
            this.carregando = true
            Promise.all([
                this.$_buscarUsuarioObra(),
                this.$_buscarUsuarios(),
                this.$_buscaCategorias()
            ])
                .then(respostas => {
                    try {
                        this.parametros.encarregado = respostas[0].data[0].id_usuario
                        this.podeAlterarEncarregado = !respostas[0].data[0].id
                    } catch (erro) {
                        this.podeAlterarEncarregado = true
                    }
                    this.stepper = this.podeAlterarEncarregado ? 'encarregado' : 'usuarios'

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
                            nota: 2
                        }))
                    this.carregando = false
                })
                .catch(erro => {
                    this.$notify.error({
                        title: 'Erro ao buscar dados',
                        message: 'Erro ao executar comando no banco de dados.',
                        apiError: erro
                    })
                    this.carregando = false
                    this.$router.back()
                })
        },

        $_buscarUsuarioObra() {
            return this.$axios.get(`/usuario_obra/`, {
                params: {
                    encarregado: 'True',
                    id_obra: this.idObra
                }
            })
        },

        $_buscarUsuarios() {
            this.usuarios = []
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
