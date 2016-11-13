const process = require('process');
const path = require('path');

const env = process.env.DEVLEVEL || 'dev';
const configFile = require(path.join(__dirname, env + '.json'));

module.exports = configFile;