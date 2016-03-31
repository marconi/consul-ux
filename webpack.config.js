var webpack = require('webpack')
var PATHS = {
  app: __dirname + '/app',
  dist: __dirname + '/dist'
}

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
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  output: {
    filename: 'bundle.js',
    path: PATHS.dist
  }
}
