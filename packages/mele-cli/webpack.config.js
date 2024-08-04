/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const patterns = [
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
const config = {
  entry: ['./src/index.ts'],
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'index.cjs',
    library: {
      type: 'commonjs'
    }
  },
  target: 'node',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({
      raw: true,
      banner: '#!/usr/bin/env node'
    }),
    new CopyPlugin({
      patterns
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
          loader: 'babel-loader'
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
  const NODE_ENV = process.env.NODE_ENV
  // 生产
  if (NODE_ENV === 'prod') {
    config.mode = 'production'
    ;(config.output.path = path.resolve(__dirname, 'dist/bin')),
      patterns.push({
        from: './package.json',
        to: '../package.json',
        transform(content) {
          // 置空依赖，避免生产环境安装的时候，自动安装无用的依赖包，大大避免空间浪费
          const packageJson = JSON.parse(content.toString())
          packageJson[`__dependencies`] = packageJson.dependencies
          packageJson[`__devDependencies`] = packageJson.devDependencies
          packageJson.dependencies = {}
          packageJson.devDependencies = {}
          return JSON.stringify(packageJson, null, 2)
        }
      })
  }
  // 预发布
  if (NODE_ENV === 'pre') {
    config.mode = 'production'
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 8888
      })
    )
  }
  // 开发
  if (NODE_ENV === 'dev') {
    config.mode = 'development'
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 8888
      })
    )
    config.devtool = 'eval-source-map'
  }
  return config
}
