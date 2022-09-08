const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const productionGzipExtensions = ['js', 'css']
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack:{
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      
    },
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'element-plus': 'ElementPlus',
      'xlsx': 'XLSX'
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      // new CompressionWebpackPlugin({
      //   filename: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //   threshold: 10240,
      //   minRatio: 0.8
      // }),
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       // warnings: false,
      //       drop_debugger: true,
      //       drop_console: true,
      //       pure_funcs: ["console.log"]
      //     }
      //   },
      //   sourceMap: false,
      //   parallel: true
      // }),
       new HtmlWebpackPlugin({
         title: '政策标签工具',
         template: './public/index.html',
         filename: 'index.html'
       })
    ]
  },
  productionSourceMap: false,
  devServer: {
    port: 7007,
  },
  publicPath: './'
}