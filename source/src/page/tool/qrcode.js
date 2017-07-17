/**
 * @file 二维码页面定义
 * @author ljquan@qq.com
 */

var o_navigator = require('card/common/navigator');
var o_qr = require('card/tool/qr');
var c_qrInput = require('card/tool/qr_input');

module.exports = function(page, key) {
  var viewNav = $('<div></div>').setView(o_navigator());
  var viewQR  = $('<div class="am-container"></div>').setView(o_qr({
      getData: function(){
          return {
              href: BCD.getHash(1)||location.href
          };
      }
  }));
  page.setView({
      title: '二维码',
      viewList:[viewNav, c_qrInput, viewQR]
  });
};
