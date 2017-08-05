const fs = require('fs');
const config = JSON.parse(fs.readFileSync(__dirname + '/../.babelrc'));

require('babel-core/register')(config);
require('babel-polyfill');
require('./main');