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
    initPage: function (key, next) {
        m_loading.show();
        var page = this;
        switch (key) {
            case 'link':
                require.ensure(['page/tool/link'], function (require) {
                    next(require('page/tool/link')(page, key));
                });
                break;
            default:
                BCD.replaceHash('#!/link');
                next(-1);
                break;
        }
    }
});
