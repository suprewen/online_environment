module.exports = {
  devServer: {
    open: true,
    before: require('./mock/mock-server.js')
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
}