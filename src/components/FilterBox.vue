<template>
    <div class="filter-box no-padding">
        <q-collapsible
            id="fboxCollapsible"
            class="collapsible"
            label="Filtros"
            icon="search"
            :opened="filtroAberto"
        >
            <div class="container row sm-gutter items-end group">
                <slot
                    class="row justify-between vertical-bottom no-margin no-padding"
                    style="width: 100%"
                    :onKeyUp="$_doAplicarFiltros"
                />
                <q-field class="row filter-box-buttons col-12">
                    <q-btn-group
                        class="btn-group q-my-xs"
                        outline
                    >
                        <q-btn
                            id="btnFBoxAplicarFiltros"
                            push
                            color="primary"
                            icon="search"
                            :label="lowResolution ? '' : 'Buscar'"
                            @click="$_doAplicarFiltros"
                        />
                        <q-btn
                            id="btnFBoxLimparFiltros"
                            push
                            icon="clear"
                            :label="lowResolution ? '' : 'Limpar'"
                            @click="$_doLimparFiltros"
                        />
                    </q-btn-group>
                </q-field>
            </div>
        </q-collapsible>
    </div>
</template>

<script>

export default {
  name: 'FilterBox',

  props: {
    value: {
      type: Object,
      required: true
    },

    aplicarFiltros: {
      type: Function,
      required: true
    },

    autoLoad: {
      type: Boolean,
      default: true
    },

    limparFiltros: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      filtros: {},

      filtroAberto: false,

      lowResolution: false
    }
  },

  mounted() {
    if (this.autoLoad) {
      this.aplicarFiltros()
    }

    this.$on('lowResolution', (valor) => {
      this.lowResolution = valor
    })
  },

  methods: {
    $_alterarUserInterface(value){
      if (this.userInterface) {
        try {
          this.$q.localStorage.set(`${this.chaveWebStorage}_openedFilter`, value)
        } catch (e) {
          alert('Necessário instalar plugin LocalStorage do Quasar Framework')
          console.log(e)
        }
      } else {
        this.filtroAberto = value
      }
    },

    $_doLimparFiltros() {
      this.limparFiltros()
      this.$_doAplicarFiltros()
    },

    $_doAplicarFiltros() {
      this.aplicarFiltros()
    }
  }
}
</script>

<style lang="scss" scoped>
.collapsible {
    min-width: 200px;
    margin: 10px 0;
    margin-left: 0px;
    padding: 5px 5px;
    border: 1px solid #d2d6de;
}

.filter-box-buttons {
    padding-top: 0;
    margin: 0px;
    padding-left: 0px;
}

.container {
    padding: 0;
    padding-top: 8px;
}

</style>
