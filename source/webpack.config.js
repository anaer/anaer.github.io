var path = require('path');
var webpack = require("webpack");


module.exports = function (method) {
  var config = {
    entry: {
      index: __dirname + '/src/tool.js'
    },
    resolve: {
      root: __dirname, //当前文件目录的绝对路径
      extensions: ['', '.js', '.css', '.json', '.scss'],
      alias: {
        'card': 'src/card',
        'common': 'src/common',
        'model': 'src/model',
        'helper': 'src/helper',
        'css': 'src/css',
        'page': 'src/page'
      }
    },
    module: {
      loaders: [{
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, {
        test: /\.js|jsx$/, //是一个正则，代表js或者jsx后缀的文件要使用下面的loader
        loader: "babel",
        query: {
          presets: ['es2015']
        }
      }]
    }
  };

  config.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 2E4
    })
  ];
  config.output = {
    publicPath: "./source/dist/",
    filename: "[name].js",
    chunkFilename: "tool.chunk_[id].js"
  };
  if (method !== 'build') {
    config.devtool = "sourcemap";
    config.debug = true;
  }

  return config;
};
