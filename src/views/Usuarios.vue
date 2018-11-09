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
                                id="inpCPF"
                                v-model="filtros.cpf"
                                float-label="CPF"
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
                                v-model="filtros.matricula"
                                float-label="Matrícula"
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
                                v-model="filtros.nome"
                                float-label="Nome"
                                clearable
                                @keyup.enter="props.onKeyUp"
                            />
                        </q-field>
                    </div>
                    <div class="col-sm-6">
                        <q-field class="g-form-filtro-field">
                            <q-input
                                id="inpApelido"
                                v-model="filtros.apelido"
                                float-label="Apelido"
                                clearable
                                @keyup.enter="props.onKeyUp"
                            />
                        </q-field>
                    </div>
                </div>
            </template>
        </filter-box>
        <data-table
            ref="table"
            url-base="/usuarios/"
            :colunas="colunas"
            :define-filtros="$_defineFiltros"
            :selecionado.sync="selecionado"
            chave="id"
        />
    </q-page>
</template>

<script>
import { mask } from 'vue-the-mask'
import FilterBox from '../components/FilterBox'
import DataTable from '../components/DataTable'

export default {
  name: 'PageUsuarios',

  components: {
    FilterBox,
    DataTable
  },

  directives: { mask },

  data () {
    return {
      filtros: {
        nome: '',
        matricula: '',
        apelido: '',
        cpf: ''
      },
      dados: [],
      colunas: [
        {
          name: 'id',
          required: true,
          label: 'Código',
          align: 'rigth',
          field: 'id',
          sortable: true
        },
        {
          name: 'nome',
          required: true,
          label: 'Nome',
          align: 'left',
          field: 'nome',
          sortable: true
        },
        {
          name: 'apelido',
          required: true,
          label: 'Apelido',
          align: 'left',
          field: 'apelido',
          sortable: true
        },
        {
          name: 'telefone',
          required: true,
          label: 'Telefone',
          align: 'left',
          field: 'telefone'
        },
        {
          name: 'funcao1',
          required: true,
          label: 'Função 1',
          align: 'left',
          field: 'funcao1',
          sortable: true
        },
        {
          name: 'funcao2',
          required: true,
          label: 'Função 2',
          align: 'left',
          field: 'funcao2',
          sortable: true
        }
      ],
      selecionado: []
    }
  },

  methods: {
    $_defineFiltros(config) {
      if (this.filtros.nome){
        config.params.nome = this.filtros.nome
      }
      if (this.filtros.apelido){
        config.params.apelido = this.filtros.apelido
      }
      if (this.filtros.matricula){
        config.params.matricula = this.filtros.matricula
      }
      if (this.filtros.cpf){
        config.params.cpf = this.filtros.cpf.split('.').join('').split('-').join('')
      }

      return config
    },

    $_aplicarFiltros() {
      this.$refs.table.pesquisar()
    },

    $_limparFiltros() {
      this.filtros = {
        nome: '',
        matricula: '',
        apelido: '',
        cpf: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
