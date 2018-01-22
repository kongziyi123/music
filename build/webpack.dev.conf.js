'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const axios=require('axios')
const express = require('express')
const app = express() 
var apiRoutes = express.Router()




app.use('/api', apiRoutes)

app.use('/api2', apiRoutes)






const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {

      app.get('/api/someApi', (req, res) => {
        var url="https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg";
        axios.get(url,{
          headers:{
            referer:'https://y.qq.com/n/yqq/playlist/3621037357.html',
            host:'c.y.qq.com'
          },
          params:req.query
          }).then((response)=>{
            res.json(response.data);
          }).catch((e)=>{
          })
      })

      app.get('/api2/information',(req,res)=>{
        let url="https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg";            
        axios.get(url,{
          headers:{
            referer:"https://y.qq.com/n/yqq/song/003Xnc9k0K3CSy.html",
            host:'c.y.qq.com'
          },
          params:req.query
        }).then((response)=>{
          res.json(response.data);
        }).catch((err)=>{
          console.log(err);
        })
      }) 
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks:['app']
    }),
    
    new HtmlWebpackPlugin({
      filename:'music.html',
      template:'music.html',
      inject:true,
      chunks:['music']
    }),
    new FriendlyErrorsPlugin()
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
