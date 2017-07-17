/**
 * @file 导航页面定义
 * @author ljquan@qq.com
 */

var o_navigator = require('card/common/navigator');
var c_link = require('card/tool/link');
var c_daohang = require('card/tool/daohang');

module.exports = function(page) {
  var viewNav = $('<div></div>').setView(o_navigator());
      page.setView({
          title: '导航',
          viewList:[viewNav, c_link, c_daohang]
      });
};
