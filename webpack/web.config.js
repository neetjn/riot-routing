module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'riot-routing.web.js',
    publicPath: '../',
    libraryTarget: 'umd',
    library: 'RiotRouting',
    umdNamedDefine: true
  },
  watch: false,
  mode: 'production',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@riotjs/webpack-loader',
          },
        ]
      }
    ]
  }
}
