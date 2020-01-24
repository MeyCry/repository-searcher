const webpack = require('webpack');
const path = require('path');

const {isWatch} = process.argv.reduce((result, item) => {
    result[item] = true;
    return result;
}, {});

const webpackConfig = require('./webpack.config');

const webpackCompileCallback = (function () {
    var lastHash = null;

    return function (err, stats) {
        if (err) {
            console.error(err);
            if (!isWatch) {
                process.exit(1);
            }
        }

        if (stats.hash !== lastHash) {
            lastHash = stats.hash;
            console.log(
                stats.toString({
                    colors: true,

                    json: false,
                    cached: false,
                    cachedAssets: false,

                    modules: true,
                    chunkModules: false,
                    chunks: false
                }) + '\n'
            );
            if (!watch && stats.hasErrors()) {
                process.exit(1);
            }
        }
    };
})();

(async () => {
    const compiler = webpack(webpackConfig);

    if (isWatch) {
        compiler.watch({
            aggregateTimeout: 300,
            poll: true,
            ignored: ['node_modules'],
        }, webpackCompileCallback);
    } else {
        compiler.run(webpackCompileCallback);
    }
})();
