module.exports = {
  entry: {
    main: './src'
  },
  output: {
    filename: 'riot-routing.js',
    publicPath: '../',
    libraryTarget: 'umd'
  },
  watch: false,
  mode: 'production',
  target: 'node',
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
