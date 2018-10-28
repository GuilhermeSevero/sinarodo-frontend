<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <toolbar @clickMenu="$_toggleMenu"/>
    </q-layout-header>

    <q-layout-drawer
      v-model="menuAberto"
      content-class="bg-grey-2"
    >
      <div class="flex flex-center">
        <img
          class="q-mt-md"
          alt="Logo Sinarodo"
          src="../assets/logo.png"
        >
      </div>
      <lista-menu-esquerdo/>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Toolbar from '../components/Toolbar'
import ListaMenuEsquerdo from '../components/ListaMenuEsquerdo'

export default {
  name: 'LayoutDefault',

  components: {
    Toolbar,
    ListaMenuEsquerdo
  },

  data () {
    return {
      menuAberto: this.$q.platform.is.desktop
    }
  },

  methods: {
    $_toggleMenu () {
      this.menuAberto = !this.menuAberto
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
