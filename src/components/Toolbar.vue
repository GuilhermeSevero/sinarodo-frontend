<template>
    <q-toolbar
        :inverted="$q.theme === 'ios'"
        color="primary"
    >
        <q-btn
            id="btnLayVoltar"
            class="c-btn-voltar text-white no-padding"
            dense
            color="primary"
            :big="isMobile"
            icon="navigate_before"
            round
            v-show="!$route.meta.noBack"
            flat
            @click="$_voltar()"
        >
            <q-tooltip
                anchor="center right"
                self="center left"
                :delay="500"
            >
                Voltar
            </q-tooltip>
        </q-btn>

        <q-btn
            flat
            dense
            round
            aria-label="Menu"
            icon="menu"
            @click="$_clickMenu"
        />

        <q-toolbar-title>
            {{ title }}
            <div slot="subtitle">{{ subtitle }}</div>
        </q-toolbar-title>
    </q-toolbar>
</template>

<script>
export default {
    name: 'Toolbar',
    data () {
        return {
        }
    },

    computed: {
        title () {
            return this.$route.meta.title
        },

        subtitle () {
            return this.$route.meta.subtitle
        },

        isMobile() {
            return this.$q.platform.is.mobile
        }
    },

    methods: {
        $_clickMenu () {
            this.$emit('clickMenu')
        },

        $_voltar() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
