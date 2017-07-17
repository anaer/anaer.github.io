/**
 * @file 性能检测页面定义
 * @author ljquan@qq.com
 */


var o_navigator = require('card/common/navigator');
const c_daohang = require('card/common/daohang');
const m_benchmark = require('model/benchmark.js');

module.exports = function(page) {
  var viewNav = $('<div></div>').setView(o_navigator());
  var viewDaohang = $('<div/>');
  c_daohang(viewDaohang, m_benchmark.daohangList);
  page.setView({
      title: '性能基准测试',
      viewList:[viewNav, viewDaohang]
  });
};
