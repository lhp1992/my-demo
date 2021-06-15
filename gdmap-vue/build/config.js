var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('./components.json');

var unitsList = fs.readdirSync(path.resolve(__dirname, '../src/units'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`lhp-amap/packages/${key}`] = `lhp-amap/lib/${key}`;
});

unitsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`lhp-amap/src/units/${file}`] = `lhp-amap/lib/units/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`lhp-amap/src/mixins/${file}`] = `lhp-amap/lib/mixins/${file}`;
});

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};