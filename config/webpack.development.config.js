const path = require('path');
const publicPath = '/';

module.exports = {
    mode: 'development',
    entry: {
        ShareholderProvider: '../src/provider/ShareholderProvider.js',
        /*IPFSUploadProvider: '../src/provider/IPFSUploadProvider',
        IPFSDownloadProvider: '../src/provider/IPFSDownloadProvider'*/
        //ProposalProvider: '../src/provider/ProposalProvider'
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
                        presets: ["es2015"]
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
    }
}