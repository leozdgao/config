import path from 'path'
import webpack from 'webpack'
import { entryPoint, externals, jsLoader, autoprefixerLoader } from './baseConfig'
import config from '../config'

const webpackDevServerAddress = `http://localhost:${config.webpackDevPort}`
const cssLoaderForDev = `style-loader!css-loader!${autoprefixerLoader}`

export default {
  devtool: 'eval',
  entry: [
    `webpack-dev-server/client?${webpackDevServerAddress}`,
    'webpack/hot/only-dev-server',
    entryPoint
  ],
  externals,
  output: {
    path: process.env['PUBLISHPATH'] || './assets',
    filename: 'bundle.js',
    publicPath: `${webpackDevServerAddress}/assets/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: `react-hot-loader!${jsLoader}`, exclude: /node_modules/ },
      { test: /\.css$/, loader: cssLoaderForDev },
      { test: /\.less$/, loader: `${cssLoaderForDev}!less-loader` }
    ]
  }
}
