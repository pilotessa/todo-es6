var webpack = require('webpack');
var buildUtils = require('./buildUtils');
var buildHash = buildUtils.hashCode(new Date());

module.exports = {
    entry: {
        app: ['./src/js/main.js']
    },
    output: {
        filename: '[name]-' + buildHash + '.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel?' + JSON.stringify({
                presets: ["es2015", "stage-0"],
                plugins: [
                    ["transform-decorators-legacy"],
                    ["transform-runtime", {"polyfill": false, "regenerator": true, "moduleName": "babel-runtime"}]
                ]
            })]
        }]
    }
};