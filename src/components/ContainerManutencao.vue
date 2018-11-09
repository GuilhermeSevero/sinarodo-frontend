<template>
    <div class="no-margin">
        <slot/>
        <q-field class="generic-margin col-12">
            <q-btn-group
                class="btn-group q-my-xs"
                outline
            >
                <q-btn
                    id="btnSalvar"
                    push
                    color="primary"
                    icon="search"
                    :label="lowResolution ? '' : 'Salvar'"
                    @click="salvar"
                />
                <q-btn
                    id="btnCancelar"
                    push
                    icon="clear"
                    :label="lowResolution ? '' : 'Cancelar'"
                    @click="$_voltar"
                />
            </q-btn-group>
        </q-field>
    </div>
</template>

<script>
export default {
  name: 'ContainerManutencao',

  props: {
    url: {
      type: String,
      required: true,
      default: ''
    },

    parametros: {
      type: Object,
      required: true,
      default: () => ({})
    },

    registroNovo: {
      type: Boolean,
      required: true,
      default: false
    },

    validador: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      lowResolution: false
    }
  },

  mounted() {
    console.log(this)
    this.$on('lowResolution', (valor) => {
      this.lowResolution = valor
    })
  },

  methods: {
    $_voltar() {
      this.$router.back()
    },

    salvar() {
      if (this.$_validarParametros()) {
        this.$_defineRequest()
          .then(resposta => {
            this.$notify.success({
              title: 'Registro salvo',
              message: 'O registro foi salvo com sucesso!',
              duration: 5000
            })
            this.$router.back()
          })
          .catch(erro => {
            this.$notify.error({
              title: 'Erro ao Salvar',
              message: 'Não foi possível salvar o registro!',
              apiError: erro
            })
          })
      }
    },

    $_defineRequest() {
      if (this.registroNovo) {
        return this.$axios
          .post(this.url, this.parametros)
      }
      return this.$axios
        .put(`${this.url + this.$route.params.id}/`, this.parametros)
    },

    $_validarParametros() {
      if (this.validador) {
        for (let campo in this.validador.$params) {
          this.validador[campo].$touch()
        }
        return !this.validador.$error
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
