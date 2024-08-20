/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
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
        include: [
          // 生产依赖
          path.resolve(__dirname, 'node_modules/ajv'),
          path.resolve(__dirname, 'node_modules/chalk'),
          path.resolve(__dirname, 'node_modules/commander'),
          path.resolve(__dirname, 'node_modules/ejs'),
          path.resolve(__dirname, 'node_modules/figlet'),
          path.resolve(__dirname, 'node_modules/i18n'),
          path.resolve(__dirname, 'node_modules/inquirer'),
          path.resolve(__dirname, 'node_modules/ora')
        ],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  externals: {
    // 排除不能打包的库
    sharp: 'sharp'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'node:events': 'events',
      'node:process': 'process'
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs', '...']
  },
  stats: {
    errorDetails: true
  }
}

module.exports = () => {
  console.clear()
  const NODE_ENV = process.env.NODE_ENV
  // 生产
  if (NODE_ENV === 'ci') {
    config.mode = 'production'
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: './package.json',
            to: '../package.json',
            transform(content) {
              // 置空依赖，避免生产环境安装的时候，自动安装无用的依赖包，大大避免空间浪费
              const packageJson = JSON.parse(content.toString())
              packageJson[`__dependencies`] = packageJson.dependencies
              packageJson[`__devDependencies`] = packageJson.devDependencies
              packageJson.devDependencies = {}
              const { sharp } = packageJson.dependencies
              packageJson.dependencies = {
                // 安装不能打包的库
                sharp
              }
              return JSON.stringify(packageJson, null, 2)
            }
          }
        ]
      })
    )
  }
  // 预发布
  if (NODE_ENV === 'pre') {
    config.mode = 'production'
    // config.plugins.push(
    //   new BundleAnalyzerPlugin({
    //     analyzerPort: 8888
    //   })
    // )
  }
  // 开发
  if (NODE_ENV === 'dev') {
    config.mode = 'development'
    // config.plugins.push(
    //   new BundleAnalyzerPlugin({
    //     analyzerPort: 8888
    //   })
    // )
    config.devtool = 'eval-source-map'
  }
  return config
}
