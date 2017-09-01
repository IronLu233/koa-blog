const path = require('path')
require("babel-polyfill")

const root = path.resolve(__dirname, '..')

module.exports = {
    entry: ['babel-polyfill', path.join(__dirname, 'src', 'main.js')],
    output: {
        path: path.join(root, 'public', 'js'),
        filename: 'bundle.js',
    },
    resolve: {
        alias: {
          vue: 'vue/dist/vue.js'
        }
      },
    module: {
        rules: [
            { test: /\.vue$/, loader: 'vue-loader' },
            {
                test: /\.js$/,
                loader: 'babel-loader', exclude: '/node_modules/',
            },
            {
                test: /\.css/,
                loader: 'style-loader!css-loader',
            }
        ]
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false
}
