/**
 * @file 模板可视化编辑页面定义
 * @author ljquan@qq.com
 */

var o_navigator = require('card/common/navigator');
var c_edit = require('card/tool/edit');

module.exports = function(page) {
  var viewNav = $('<div></div>').setView(o_navigator());
  page.setView({
      title: '模板可视化编辑',
      viewList:[viewNav, c_edit]
  });
};
