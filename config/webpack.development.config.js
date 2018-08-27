const path = require('path');
const publicPath = '/';
//require('babel-polyfill');

module.exports = [{
    mode: 'development',
    entry: {
        polyfill: 'babel-polyfill',
        app: '../src/app/scripts/index.js'
        /*manageSPA: '../src/app/scripts/manageSPA.js',
        authentication: '../src/app/scripts/authentication.js',
        agmSetup: '../src/app/scripts/agmSetup.js',
        voting: '../src/app/scripts/voting.js',
        qAndA: '../src/app/scripts/qAndA.js'*/
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
}/*, {
    mode: 'development',
    entry: {
        '0_polyfill': 'babel-polyfill',
        '1_initial_migrations': '../solidity/pre-migrations/1_initial_migration.js',
        '2_deploy_contracts': '../solidity/pre-migrations/2_deploy_contracts',
        '3_agm_owner_setup': '../solidity/pre-migrations/3_agm_owner_setup',
        '4_create_qAndA': '../solidity/pre-migrations/3_agm_owner_setup'
    },
    output: {
        path: path.resolve(__dirname, '../solidity/migrations'),
        filename: '[name].js',
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
            },
            {
                test: /\.sol$/,
                loaders: ['solidity-loader?export=true']
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
}*/];

/*
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
*/