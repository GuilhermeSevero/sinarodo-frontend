<template>
<q-list
    no-border
    link
    inset-delimiter
  >
    <q-list
      no-border
      link
      inset-delimiter
    >
      <q-item-separator/>
      <q-list-header>Navegação</q-list-header>
      <q-item
        to="/"
        exact
      >
        <q-item-side icon="home"/>
        <q-item-main label="Home"/>
      </q-item>
      <q-item to="/about">
        <q-item-side icon="info_outline" />
        <q-item-main label="About" />
      </q-item>
    </q-list>
  </q-list>
</template>

<script>
export default {
  name: 'ListaMenuEsquerdo',

  data () {
    return {

    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
