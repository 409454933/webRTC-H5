'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

    // BASE_API: '"http://192.168.1.174:9906/api/3.0/"',

    // 线上地址
    BASE_API: "http://192.168.131.111:3000/",
    //测试地址
    // BASE_API: '"http://crmtestbackend.rudolph-ibs.com/api/3.0/"',

});
