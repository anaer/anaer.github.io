/**
 * @file tool 入口文件，路由定义
 * @author ljquan@qq.com
 */
require('./polyfill');
var m_loading = require('card/common/loading');
require('helper/common_event'); //注册公共指令
require('css/tool.css');
var o_navigator = require('card/common/navigator');
var m_util = require('common/util');

//入口
BCD.app({
    initPage: function(key, next) {
        m_loading.show();
        var page = this;
        switch (key) {
            /**书城*/
            case 'qrcode':
                require.ensure(['page/tool/qrcode'], function(require) {
                    next(require('page/tool/qrcode')(page, key));
                });
                break;
            case 'edit':
                require.ensure(['page/tool/edit'], function(require) {
                    next(require('page/tool/edit')(page, key));
                });
                break;
            case 'link':
                require.ensure(['page/tool/link'], function(require) {
                    next(require('page/tool/link')(page, key));
                });
                break;
            case 'benchmark':
                require.ensure(['page/tool/benchmark_link'], function(require) {
                    next(require('page/tool/benchmark_link')(page, key));
                });
                // require.ensure(['page/tool/benchmark'], function(require) {
                //     next(require('page/tool/benchmark')(page, key));
                // });
                break;
            case 'console':
                page.setView(o_navigator({
                  title: '命令行'
                }));
                next();
                m_util.load('./source/lib/eruda.min.js', function(){
                  // setTimeout(function(){
                  //   vConsole.show();
                  // }, 100);
                  eruda.init();
                });
                break;
            default:
                BCD.replaceHash('#!/link');
                next(-1);
                break;
        }
    }
});
