const path = require('path');

exports.APP_DIR_PATH = path.resolve(__dirname);
exports.BUILD_PATCH = path.resolve(__dirname, 'public');
exports.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase(); // production or development
