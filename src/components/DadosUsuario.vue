<template>
  <div class="row items-center container">
    <q-icon
      name="person"
      size="25px"
    />
    <span>{{ nomeUsuario }}</span>
  </div>
</template>

<script>
export default {
  name: 'DadosUsuario',

  data () {
    return {
    }
  },

  computed: {
    nomeUsuario () {
      return this.$store.state.usuario.nome
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-left: 10px;
}
</style>
