<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <toolbar @clickMenu="$_toggleMenu"/>
    </q-layout-header>

    <q-layout-drawer
      v-model="menuAberto"
      content-class="bg-grey-2"
    >
      <div class="menu-detalhes">
        <img
          class="imagem-logo"
          alt="Logo Sinarodo"
          src="../assets/logo.png"
        >
        <dados-usuario/>
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
import DadosUsuario from '../components/DadosUsuario'

export default {
  name: 'LayoutDefault',

  components: {
    Toolbar,
    ListaMenuEsquerdo,
    DadosUsuario
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
.menu-detalhes {
  background: #fff!important;
  height: 130px;

  .imagem-logo {
    margin: 20px 60px;
  }
}
</style>
