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
            <q-item
                v-if="validarNivel(1, 2)"
                to="/categorias"
            >
                <q-item-side icon="assignment" />
                <q-item-main label="Categorias" />
            </q-item>
            <q-item
                v-if="validarNivel(1, 2)"
                to="/obras"
            >
                <q-item-side icon="business_center" />
                <q-item-main label="Obras" />
            </q-item>
            <q-item
                v-if="validarNivel(1, 2)"
                to="/premiacoes"
            >
                <q-item-side icon="card_giftcard" />
                <q-item-main label="Premiações" />
            </q-item>
            <q-item
                v-if="validarNivel(1, 2)"
                to="/usuarios"
            >
                <q-item-side icon="account_box" />
                <q-item-main label="Usuários" />
            </q-item>
            <q-item-separator/>
            <q-item
                v-if="validarNivel(1)"
                to="/configuracoes"
            >
                <q-item-side icon="settings" />
                <q-item-main label="Configurações" />
            </q-item>
        </q-list>
    </q-list>
</template>

<script>
import login from '../plugins/login'

export default {
    name: 'ListaMenuEsquerdo',

    data () {
        return {

        }
    },

    methods: {
        validarNivel(...niveis) {
            let validar = login.validarNivel(...niveis)
            return validar()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
