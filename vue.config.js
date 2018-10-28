module.exports = {
  pluginOptions: {
    quasar: {
      theme: 'mat',
      rtlSupport: true,
      importAll: true
    }
  },

  transpileDependencies: [
    /[\\/]node_modules[\\/]quasar-framework[\\/]/
  ],

  lintOnSave: undefined,
  baseUrl: '/app/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
}
