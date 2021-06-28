var path = require("path");
var webpack = require("webpack")

module.exports = {
  entry: "./js/walletinfo.js",
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
    },
    fallback: {
      assert: false,
      url: false,
      https: false,
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      os: false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  mode: "development",
  target: "web",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    //libraryTarget: 'umd'
  },
  devServer: {
    contentBase: path.join(__dirname, "/"),
    compress: true,
    port: 9002,
  },
};
