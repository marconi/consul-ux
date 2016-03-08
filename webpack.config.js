var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

var PATHS = {
  app: __dirname + '/app',
  dist: __dirname + '/dist'
};

module.exports = {
  entry: [
    PATHS.app
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.css$/, loaders: ['style', 'css'], includes: [PATHS.app]},
      {test: /\.js|\.jsx/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  output: {
    filename: "bundle.js",
    path: PATHS.dist
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    inline: true
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin()
  ]
};
