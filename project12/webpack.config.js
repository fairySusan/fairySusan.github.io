var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath:'/dist/',
        filename: "[name].js"
    },
    module: {
        loaders: [
        /***以前写的loader：'vue',
        **报错“TypeError this._init is not function”
        **改为loader：'vue-loader'
        ***/
            {test: /\.vue$/,loader: 'vue-loader'   },
            { test: /\.css$/, loader: "style!css" },
            {test: /.js$/, use: ['babel-loader']},
        ]
    },
    resolve: {
      alias: {
          'vue$': 'vue/dist/vue.js'
      },
      extensions: ['.js', '.vue']
  }
};