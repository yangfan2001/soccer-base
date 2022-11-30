const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy: {
      '/api':{
        target:'http://localhost:5050',
        changeOrigin:true,
        pathRewrite: {
          '^/api': '',   //重写请求路径
        },
      }
    }
  }
})
