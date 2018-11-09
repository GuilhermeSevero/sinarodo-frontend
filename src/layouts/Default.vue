<template>
    <q-layout view="lHh Lpr lFf">
        <q-window-resize-observable @resize="$_onResize"/>

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
                <q-btn
                    id="btnLayMenuLogin"
                    class="c-btn-menu-login fixed-top"
                    :big="isMobile"
                    icon="more_vert"
                    flat
                >
                    <q-popover
                        class="text-primary column"
                        ref="popSair"
                        anchor="bottom right"
                        self="top right"
                    >
                        <q-btn
                            id="btnLayTelaCheia"
                            :big="isMobile"
                            v-close-overlay
                            icon="fullscreen"
                            @click="$_fullscreen"
                        >
                            Tela cheia
                        </q-btn>
                        <q-btn
                            id="btnLaySair"
                            :big="isMobile"
                            v-close-overlay
                            icon="exit_to_app"
                            @click="$_logout"
                        >
                            Sair
                        </q-btn>
                    </q-popover>
                </q-btn>
            </div>
            <lista-menu-esquerdo/>
        </q-layout-drawer>

        <q-page-container>
            <alertas />
            <router-view />
            <q-page-sticky
                :offset="[30, 60]"
                corner="bottom-right"
            >
                <q-btn
                    v-back-to-top.animate="{offset: 500, duration: 200}"
                    id="btnGoTop"
                    :big="isMobile"
                    color="primary"
                    round
                    class="animate-pop"
                    icon="keyboard_arrow_up"
                />
            </q-page-sticky>
        </q-page-container>
    </q-layout>
</template>

<script>
import Toolbar from '../components/Toolbar'
import ListaMenuEsquerdo from '../components/ListaMenuEsquerdo'
import DadosUsuario from '../components/DadosUsuario'
import Alertas from '../components/Alertas'
import { AppFullscreen } from 'quasar'

export default {
  name: 'LayoutDefault',

  components: {
    Toolbar,
    ListaMenuEsquerdo,
    DadosUsuario,
    Alertas
  },

  data () {
    return {
      menuAberto: this.$q.platform.is.desktop
    }
  },

  computed: {
    isMobile() {
      return this.$q.platform.is.mobile
    }
  },

  methods: {
    $_onResize(size) {
      this.lowResolution = (size.width < 601)
      this.$events.$emit('lowResolution', this.lowResolution)
    },

    $_toggleMenu () {
      this.menuAberto = !this.menuAberto
    },

    $_fullscreen(){
      AppFullscreen.toggle()
    },

    $_logout() {
      AppFullscreen.exit()
      this.$login.logout()
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
  .c-btn-menu-login {
    left: 249px;
    height: 30px;
  }
}
</style>
