<template>
    <q-toolbar
        :inverted="$q.theme === 'ios'"
        color="primary"
    >
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
    }
  },

  methods: {
    $_clickMenu () {
      this.$emit('clickMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
