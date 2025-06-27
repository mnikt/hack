const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('obj');
config.resolver.assetExts.push('mtl');

module.exports = config;
