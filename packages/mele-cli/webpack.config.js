/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const isProduction = process.env.NODE_ENV == 'production'
const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'index.js',
    library: {
      name: 'mele-cli',
      type: 'commonjs'
    }
  },
  target: 'node',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: './src/locales',
          to: './locales'
        },
        {
          from: './src/config',
          to: './config'
        },
        {
          from: './src/templates',
          to: './templates'
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs', '...']
  },
  stats: {
    errorDetails: true
  }
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'
  } else {
    config.mode = 'development'
    config.devtool = 'eval-source-map'
  }
  return config
}
