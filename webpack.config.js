module.exports = {
  entry: {
    main: './src/browser.js'
  },
  output: {
    filename: 'browser.bundle.js',
    publicPath: './'
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
            options: {
              hot: false,
              scopedCss: true
            },
          },
        ]
      }
    ]
  }
}
