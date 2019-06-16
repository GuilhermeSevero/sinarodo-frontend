<template>
    <div class="c-alert-container fixed-top-right z-top group">
        <transition
            v-for="alerta in alertas"
            :key="alertas.indexOf(alerta)"
            :ref="'alerta_' + alertas.indexOf(alerta)"
            :enter-active-class="alerta.enter"
            :leave-active-class="alerta.leave"
            appear
        >
            <q-alert
                v-if="alerta.visible"
                id="alertLayout"
                :type="alerta.type"
                appear
                class="q-mb-sm"
            >
                <span
                    id="btnAlertFechar"
                    @click="$_fecharAlerta(alerta)"
                    v-html="alerta.html"
                />
            </q-alert>
        </transition>
    </div>
</template>

<script>
export default {
    data () {
        return {
            alertas: []
        }
    },

    created () {
        this.$events.$on('alerta', this.$_mostraAlerta)
    },

    destroyed () {
        this.$events.$off('alerta', this.$_mostraAlerta)
    },

    methods: {
        $_mostraAlerta (alerta) {
            this.alertas.push(alerta)
            if (alerta.duration) {
                setTimeout(function () {
                    alerta.visible = false
                }, alerta.duration)
            }
        },

        $_fecharAlerta (alerta) {
            alerta.visible = false
        }
    }
}
</script>

<style lang="scss" scoped>
.c-alert-container {
    margin-top: 55px
}
</style>
