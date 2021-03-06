const path = require('path')

const config = {
  entry: ['./src/index.js'],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'redux-pipe',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}
module.exports = config
