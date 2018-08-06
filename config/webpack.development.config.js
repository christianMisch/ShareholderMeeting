const path = require('path');

module.exports = {
    mode: 'development',
    entry: '../src/provider/ShareholderProvider.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module : {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: "env"
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: './dist'
    },
    devtool: 'inline-source-map'
}