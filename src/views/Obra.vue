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
                title="Cadastro da Obra"
                name="obra"
                default
                :error="erroStep1"
            >
                <q-field
                    class="g-form-filtro-field"
                    :count="20"
                    error-label="Digite o número do pedido"
                    :error="$v.parametros.pedido.$error"
                >
                    <q-input
                        id="inpPedido"
                        v-model="parametros.pedido"
                        float-label="Pedido"
                        maxlength="20"
                        autofocus
                        clearable
                        @blur="$v.parametros.pedido.$touch"
                    />
                </q-field>
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite a data de inicio da obra"
                    :error="$v.parametros.data_inicio.$error"
                >
                    <q-datetime
                        id="dateInicio"
                        v-model="parametros.data_inicio"
                        type="date"
                        float-label="Data Inicio"
                        clearable
                        format="DD/MM/YYYY"
                        @blur="$v.parametros.data_inicio.$touch"
                    />
                </q-field>
                <q-field
                    class="g-form-filtro-field"
                    error-label="Digite a data do fim da obra"
                    :error="$v.parametros.data_final.$error"
                >
                    <q-datetime
                        id="dateFinal"
                        v-model="parametros.data_final"
                        type="date"
                        float-label="Data Final"
                        clearable
                        format="DD/MM/YYYY"
                        @blur="$v.parametros.data_final.$touch"
                    />
                </q-field>
                <q-field
                    class="g-form-filtro-field"
                    :count="300"
                >
                    <q-input
                        id="inpObservacao"
                        v-model="parametros.observacao"
                        type="textarea"
                        float-label="Observação"
                        maxlength="300"
                        clearable
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
                    :count="20"
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
    name: 'PageObra',

    data() {
        return {
            url: '/obras/',

            carregando: false,

            stepper: 'obras',

            usuarios: [],

            selecionado: [],

            parametros: {
                id: null,
                pedido: null,
                data_lancamento: null,
                data_inicio: null,
                data_final: null,
                observacao: '',
                usuarios: [],
                categorias: []
            }
        }
    },

    computed: {
        erroStep1() {
            let params = this.$v.parametros
            return params.pedido.$error || params.data_inicio.$error || params.data_final.$error
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
            pedido: { required },
            data_inicio: { required },
            data_final: { required },
            usuarios: {
                required,
                minLength: minLength(1)
            }
        }
    },

    mounted() {
        this.parametros.data_lancamento = Date.now()
        this.$_buscarUsuarios()
        this.$_buscaCategorias()
    },

    methods: {
        $_modificaParametros(parametros) {
            if (parametros.data_lancamento) {
                parametros.data_lancamento = date.formatDate(this.parametros.data_lancamento, 'YYYY-MM-DD')
            }
            if (parametros.data_inicio) {
                parametros.data_inicio = date.formatDate(this.parametros.data_inicio, 'YYYY-MM-DD')
            }
            if (parametros.data_final) {
                parametros.data_final = date.formatDate(this.parametros.data_final, 'YYYY-MM-DD')
            }
            return parametros
        },

        $_onStep(stepAtual) {
            if (stepAtual === 'usuarios') {
                this.$v.parametros.pedido.$touch()
                this.$v.parametros.data_inicio.$touch()
                this.$v.parametros.data_final.$touch()
            } else if (stepAtual === 'premiacao') {
                this.$v.parametros.usuarios.$touch()
            }
        },

        $_proximo() {
            if (this.stepper === 'premiacao') {
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

        $_buscarUsuarios() {
            this.usuarios = []
            this.selecionado = []
            this.$axios
                .get('/usuarios/', {
                    params: {
                        per_page: 5000,
                        sort: 'nome'
                    }
                })
                .then(resposta => {
                    this.usuarios = resposta.data
                        .map(element => ({
                            label: `${element.nome} ${element.apelido ? `(${element.apelido})` : ''}`,
                            sublabel: `Função: ${element.funcao_1 ? element.funcao_1 : ''}${element.funcao_2 ? `/${element.funcao_2}` : ''}`,
                            value: element.id
                        }))
                })
                .catch(erro => {
                    this.$notify.error({
                        title: 'Erro ao buscar Usuários',
                        message: 'Erro ao executar comando no banco de dados.',
                        apiError: erro
                    })
                })
        },

        $_buscaCategorias() {
            this.parametros.categorias = []
            this.$axios
                .get('/categorias/', {
                    params: {
                        per_page: 250,
                        sort: 'descricao'
                    }
                })
                .then(resposta => {
                    this.parametros.categorias = resposta.data
                        .map(element => ({
                            id: element.id,
                            descricao: element.descricao,
                            peso: element.peso,
                            nota: 1
                        }))
                })
                .catch(erro => {
                    this.$notify.error({
                        title: 'Erro ao buscar as Categorias',
                        message: 'Erro ao executar comando no banco de dados.',
                        apiError: erro
                    })
                })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
