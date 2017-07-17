var m_util = require('common/util');



BCD.addEvent('draw_qr', function (ele, option, data) {
  m_util.load('./source/lib/qrcode.js', function () {
    let qrcodedraw = new QRCodeLib.QRCodeDraw();
    qrcodedraw.draw(ele[0], option.url, function (error, canvas) {
      if (error) {
        return console.log('Error =( ', error);
      }
    });
  });
});

module.exports = function (option) {
  return $.extend({
    name: 'tool/qr',
    template: '<div style="height: 350px;margin: 10px;">' +
      '  <div><br><%var href=decodeURIComponent(obj.href);%><a href="<%=href%>" target="_blank"><%=href%></a></div>' +
      '<ul class="QR-list">' +
      '  <li style="padding-right:200px;">' +
      '    <canvas title="二维码" style="width: 368px;height:368px;" data-on="?m=draw_qr" data-url="<%=href%>"></canvas>' +
  //    '    <p>二维码</p>' +
      '  </li>' +
      '</ul>'
  }, option);
};
