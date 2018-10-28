<template>
  <q-list
    class="no-margin no-padding"
    no-border
    link
    inset-delimiter
  >
    <q-list
      no-border
      link
      inset-delimiter
    >
      <!-- <q-item-separator/> -->
      <q-list-header>Menu</q-list-header>
      <q-item
        to="/"
        exact
      >
        <q-item-side icon="home"/>
        <q-item-main label="Home"/>
      </q-item>
      <q-item to="/checklists">
        <q-item-side icon="assignment" />
        <q-item-main label="Checklists" />
      </q-item>
      <q-item to="/obras">
        <q-item-side icon="business_center" />
        <q-item-main label="Obras" />
      </q-item>
      <q-item to="/usuarios">
        <q-item-side icon="account_box" />
        <q-item-main label="Usuários" />
      </q-item>
      <q-item to="/configuracoes">
        <q-item-side icon="settings" />
        <q-item-main label="Configurações" />
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
