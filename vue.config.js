/*
 * @Author: linzq
 * @Date: 2021-02-20 16:07:29
 * @LastEditors: linzq
 * @LastEditTime: 2021-02-22 10:36:10
 * @Description:
 */
const path = require('path')
const defaultSettings = require('./src/config')

const name = defaultSettings.title || '案例演示' // page title
console.log(defaultSettings.title)
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true,
  pages: {
    main: {
      entry: 'src/pages/main/main.js',
      template: 'public/index.html'
    },
    login: 'src/pages/login/main.js',
    index: 'src/pages/login/main.js'
  },
  publicPath: './',
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  configureWebpack: {
    name,
    externals: {
      AMap: 'AMap',
      AMapUI: 'AMapUI'
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    config.resolve.alias
      .set('@components', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('@mixins', resolve('src/mixins'))
      .set('@pages', resolve('src/pages'))
      .set('@mainView', resolve('src/pages/main/view'))
    config.module.rule('svg').uses.clear()
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域
  devServer: {
    port: 3999, // 端口
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/variables.less') // 需要全局导入的less
      ]
    })
}
