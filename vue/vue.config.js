const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 5500,
  },
  chainWebpack: config => {
    config.plugin("html")
        .tap(args => {
              args[0].title = "跳蚤市场";
              return args;
            })
  }
})
