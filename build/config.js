var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var externals = {};

Object.keys(Components).forEach(function(key) {
    externals[`oa-ui/packages/${key}`] = `oa-ui/lib/${key}`;
});

utilsList.forEach(function(file) {
    file = path.basename(file, '.js');
    externals[`oa-ui/src/utils/${file}`] = `oa-ui/lib/utils/${file}`;
});

externals = [Object.assign({
    vue: 'vue'
}, externals), nodeExternals()];
module.exports = {
    alias:{
        main: path.resolve(__dirname, '../src'),
        packages: path.resolve(__dirname, '../packages'),
        examples: path.resolve(__dirname, '../examples'),
        'oa-ui': path.resolve(__dirname, '../')
      },
    vue:{
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      },
    'element-ui':{
        root:'Element',
        commonjs:'element-ui',
        commonjs2: 'element-ui',
        amd: 'element-ui'
    },
    jsexclude:/node_modules|utils\/popper\.js|utils\/date\.js/,
    externals
}
