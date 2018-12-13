<template>
    <q-page class="layout-page">
        <q-jumbotron
            id="jumbotron"
            dark
        >
            <div class="q-display-3">Bem Vindo</div>
            <div class="q-subheading">
                Sistema de manutenção de Premiação Sinarodo.
            </div>
            <hr class="q-hr q-my-lg">
            <div class="q-title q-mb-md">Veja os módulos disponíveis para você:</div>
            <div class="row justify-center">
                <q-btn
                    v-if="validarNivel(1, 2)"
                    to="/categorias"
                    color="primary"
                    size="xl"
                    class="q-ma-md"
                    label="Categorias"
                    icon="assignment"
                />
                <q-btn
                    v-if="validarNivel(1, 2)"
                    to="/obras"
                    color="primary"
                    size="xl"
                    class="q-ma-md"
                    label="Obras"
                    icon="business_center"
                />
                <q-btn
                    v-if="validarNivel(1, 2)"
                    to="/premiacoes"
                    color="primary"
                    size="xl"
                    class="q-ma-md"
                    label="Premiações"
                    icon="card_giftcard"
                />
                <q-btn
                    v-if="validarNivel(1, 2)"
                    to="/relatorios"
                    color="primary"
                    size="xl"
                    class="q-ma-md"
                    label="Relatórios"
                    icon="print"
                />
                <q-btn
                    v-if="validarNivel(3)"
                    to="/relatorios/usuario"
                    color="primary"
                    size="xl"
                    class="q-ma-md"
                    label="Relatórios"
                    icon="print"
                />
                <q-btn
                    v-if="validarNivel(1, 2)"
                    to="/usuarios"
                    color="primary"
                    size="xl"
                    class="q-ma-md"
                    label="Usuários"
                    icon="account_box"
                />
                <q-btn
                    v-if="validarNivel(1)"
                    to="/configuracoes"
                    color="primary"
                    size="xl"
                    class="q-ma-md"
                    label="Configurações"
                    icon="settings"
                />
                <q-btn
                    v-if="validarNivel(1)"
                    to="/logs"
                    color="primary"
                    size="xl"
                    class="q-ma-md"
                    label="Logs"
                    icon="outlined_flag"
                />
            </div>
        </q-jumbotron>
    </q-page>
</template>

<script>
import login from '../plugins/login'

export default {
    name: 'PageHome',

    methods: {
        validarNivel(...niveis) {
            let validar = login.validarNivel(...niveis)
            return validar()
        }
    }
}
</script>

<style lang="scss" scoped>
#jumbotron {
    min-height: 87vh;
}
</style>
