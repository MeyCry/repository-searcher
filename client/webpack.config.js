const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
    APP_DIR_PATH,
    BUILD_PATCH,
    NODE_ENV,

} = require('./build-constants');

const entries = {
    index: ['./src/scss/style.scss', './src/ts/index.tsx'],
};

const output = {
    filename: `./js/[name].js`,
    path: BUILD_PATCH,
    // devtoolModuleFilenameTemplate: info => `./${info.resourcePath}`,
};

const config = {
    mode: 'none',
    context: APP_DIR_PATH,
    entry: entries,
    output,
    devtool: NODE_ENV === 'development' ? 'source-map' : 'none',
    resolve: {
        modules: [
            'node_modules',
        ],
        extensions: [
            '.js', '.jsx', '.ts', '.tsx', '.scss',
        ],
    },
    resolveLoader: {
        modules: [
            'node_modules',
        ],
        moduleExtensions: [
            '-loader',
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    // Improve performance
                    cacheDirectory: true,
                },
            },

            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            modules: false,
                            sourceMap: NODE_ENV === 'development',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (/* loader */) => [autoprefixer()],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                        },
                    },

                ],
                sideEffects: true,
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
    ],
};

if (NODE_ENV === 'production') {
    config.mode = 'production';
}

module.exports = config;
