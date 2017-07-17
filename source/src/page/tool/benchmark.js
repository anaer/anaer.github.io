/**
 * @file 性能检测页面定义
 * @author ljquan@qq.com
 */


var o_navigator = require('card/common/navigator');
var c_benchmark = require('card/tool/benchmark');

module.exports = function(page) {
  var viewNav = $('<div></div>').setView(o_navigator());
  page.setView({
      title: '性能检测',
      viewList:[viewNav, c_benchmark]
  });
};
