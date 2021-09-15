//顶部导航

var m_commonEvent = require('helper/common_event');
m_commonEvent.addEvent('goQR', function (option) {
    var url = option.url || location.href;
    m_commonEvent.go({ url: '#!/qrcode/' + encodeURIComponent(url) });
});

module.exports = function (option, base) {
    return $.extend({
        name: 'tool/navigator',
        data: [{
            type: 'link',
            name: '导航',
        }, {
            type: 'qrcode',
            name: '二维码',
        }, {
            type: 'edit',
            name: '模板可视化编辑',
        }, {
            type: 'benchmark',
            name: '性能基准测试',
        }],
        getData: function (hashRender, options) {
            options.config = {
                current: BCD.getHash(0)
            };
            return options.data;
        },
        template: '<header class="am-topbar">' +
            '  <h1 class="am-topbar-brand">' +
            '    <a data-on="?m=go" data-url="<%=location.href.replace(location.origin, "https://anaer.github.io/")%>" title="正式环境">^_^</a>' +
            '  </h1>' +
            '  <button data-am-collapse="{target: \\\'.am-topbar-collapse\\\'}" class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>' +
            '  <div class="am-collapse am-topbar-collapse">' +
            '    <ul class="am-nav am-nav-pills am-topbar-nav">' +
            '    <%for(var i=0; i<obj.length; i++){var tab=obj[i];%>' +
            '      <li <%if(tab.type==config.current){%>class="am-active"<%}else{%>data-on="?m=replace" data-url="#!/<%=tab.type%>"<%}%>>' +
            '      <a style="height: 100%;padding-top: 5px;"><%=tab.name%></a></li>' +
            '    <%}%>' +
            '    </ul>' +
            '  </div>' +
            '</header>'
    }, option);
};
