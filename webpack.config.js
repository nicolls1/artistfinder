var path = require("path")
var webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: {
    index:'./js/index', 
  },
  output: {
      path: path.resolve('./assets/'),
      publicPath: 'http://localhost:8080/',
      filename: "[name].js",
  },

  plugins: [
    new webpack.OldWatchingPlugin(),
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}, // to transform JSX into JS
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ],
  },
  devServer: {
    contentBase: './'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
}
