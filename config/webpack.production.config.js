const path = require('path');
const publicPath = '/';

module.exports = [{
    mode: 'development',
    performance: {
        hints: false  
    },
    entry: {
        polyfill: 'babel-polyfill',
        app: '../src/index.js'
    }, 
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        publicPath: publicPath,
        pathinfo: false
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
    resolve: {
        extensions: ['.js']
    },
    node: {
        fs: "empty"
    }
}];