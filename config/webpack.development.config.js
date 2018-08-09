const path = require('path');
const publicPath = '/';
require('babel-polyfill');

module.exports = {
    mode: 'development',
    entry: {
        polyfill: 'babel-polyfill',
        app: '../src/app/scripts/index.js',
        //manageSPA: '../src/app/scripts/manageSPA.js',
        authentication: '../src/app/scripts/authentication.js'
        //ShareholderProvider: '../src/provider/ShareholderProvider.js'
    }, 
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        publicPath: publicPath
    },
    module : {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2017"]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js']
    },
    node: {
        fs: "empty"
    }
}