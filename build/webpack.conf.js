const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: 'production',
    entry: {
        app: ['./src/index.js']
    },
    output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '/dist/',
        filename: 'index.js',
        chunkFilename: '[id].js',
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: 'Oa',
        umdNamedDefine: true,
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias
    },
    externals: {
        vue: config.vue,
        'element-ui':config['element-ui']
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    performance: {
        hints: false
    },
    stats: {
        children: false
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: config.jsexclude,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ]
};
