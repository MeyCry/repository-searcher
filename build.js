const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');

const webpackConfig = require('./webpack.config');
const {
    BUILD_PATCH,
    SOURCE_PATCH
} = require('./build-constants');

const {watch: isWatch} = process.argv.reduce((result, item) => {
    result[item] = true;
    return result;
}, {});

function copyHtml() {
    fs.copy(path.resolve(SOURCE_PATCH, 'index.html'), `${BUILD_PATCH}/index.html`);
    fs.copy(path.resolve(SOURCE_PATCH, 'index.html'), `${BUILD_PATCH}/404.html`);
}

function copyImages() {
    fs.copy(path.resolve(SOURCE_PATCH, 'images'), `${BUILD_PATCH}/images`);
}

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
                    chunks: false,
                }) + '\n',
            );
            if (!isWatch && stats.hasErrors()) {
                process.exit(1);
            }
        }
    };
})();

(async () => {
    fs.removeSync(BUILD_PATCH);
    copyHtml();
    copyImages();
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
