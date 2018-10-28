<template>
  <q-toolbar
    color="primary"
    :inverted="$q.theme === 'ios'"
  >
    <q-btn
      flat
      dense
      round
      @click="$_clickMenu"
      aria-label="Menu"
      icon="menu"
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
      title: 'Título',
      subtitle: 'Subtitulo da página'
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
