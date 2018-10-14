const path = require('path');
const publicPath = '/';

/**
 * @summary provides loader to transpile ES2017 into browser-compatible JS 
 */

module.exports = [{
    // the used mode of the config file
    mode: 'development',
    // show performance warnings e.g. if size limit is exceeded
    performance: {
        hints: 'warning'
    },
    // from where the babel loader shall start transpiling
    entry: {
        // use some polyfills, it should be always at first position
        polyfill: 'babel-polyfill',
        // main entry point for the SPA, load also all other JS files from there
        app: '../src/index.js'
    },
    // transpiled files are moved to /dist directory
    output: {
        path: path.resolve(__dirname, '../dist'),
        // give the transpiles files different names
        filename: '[name].bundle.js',
        publicPath: '/app/scripts',
        pathinfo: true
    },
    module : {
        rules: [
            {
                // use babel-loader for all .js files
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
    // development server enables live reloading of the browser during changes
    devServer: {
        // serve content from the dist directory
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true,
        // open the app's html
        openPage: '../src/app/AgmSPA.html'
    },
    // map the compressed file to the original source to find the error during debugging 
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js']
    },
    node: {
        fs: "empty"
    }
}];