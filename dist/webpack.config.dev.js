"use strict";

var _fallback;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var path = require("path");

var webpack = require("webpack");

module.exports = {
  entry: "./js/walletinfo.js",
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib"
    },
    fallback: (_fallback = {
      assert: false,
      url: false,
      https: false,
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false
    }, _defineProperty(_fallback, "https", false), _defineProperty(_fallback, "stream", false), _defineProperty(_fallback, "crypto", false), _defineProperty(_fallback, "os", false), _fallback)
  },
  plugins: [new webpack.ProvidePlugin({
    process: "process/browser",
    Buffer: ["buffer", "Buffer"]
  })],
  mode: "development",
  target: "web",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js" //libraryTarget: 'umd'

  },
  devServer: {
    contentBase: path.join(__dirname, "/"),
    compress: true,
    port: 9002
  }
};