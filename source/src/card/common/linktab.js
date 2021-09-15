// 默认隐藏二维码button
module.exports = function(option) {
    return $.extend({
        name: 'common/linktab',
        template: '<div class="am-u-sm-12 am-u-md-6 am-u-lg-4">' +
            '    <section class="am-panel am-panel-<%=obj.style||"secondary"%>">' +
            '        <header class="am-panel-hd">' +
            '            <h3 class="am-panel-title"><%=obj.title%></h3>' +
            '        </header>' +
            '        <div class="am-panel-bd">' +
            '            <ul class="am-list">' +
            '                <%var list = obj.rows; for(var i=0, len=list.length; i<obj.limit && i<len; i++){%>' +
            '                <li style="padding:8px"><span ><a data-on="?m=<%=config.isEnv ? "goEnv" : "go"%>&target=_blank" data-url="<%=list[i].href%>" title="<%=list[i].title%>"><img style="height:16px; width:16px" src="<%=list[i].favicon%>"></img> <%=list[i].name%></a></span>' +
            '                <button style="display:none" type="button" class="am-btn am-btn-default am-btn-xs" style="float:right" data-on="?m=goQR<%=config.isEnv ? "&env=1" : ""%>" data-url="<%=list[i].href%>">QR</button></li><%}%>' +
            '            </ul>' +
            '        </div>' +
            '    </section>' +
            '</div>'
    }, option);
};
