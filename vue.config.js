/* eslint-disable */
const path=require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/remoney-website/'
    : '/',

  devServer: {
    port: 3033,
    host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    disableHostCheck: true, //webpack4.0 开启热更新
  },

  assetsDir:'public',
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname,'src/assets/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end()
      .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({extract:false}).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options=>({...options,plugins:[{removeAttrs:{attrs:'fill'}}]})).end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'),[{plainSprite:true}])
    config.module.rule('svg').exclude.add(dir)
  },
}
