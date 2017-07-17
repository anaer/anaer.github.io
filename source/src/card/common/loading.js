var dom = $(
    '<div class="mod-loading  fixed" style="display:none">' +
    '  <div class="loading">' +
    '    <b class="block"></b>' +
    '    <b class="block"></b>' +
    '    <b class="block"></b>' +
    '  </div>' +
    '</div>');
$('body').append(dom);
module.exports = dom;
/*
{
    show: function(mainDom) {
        if (mainDom) mainDom.hide();
        dom.show();
    },
    hide: function(mainDom) {
        if (mainDom) mainDom.show();
        dom.hide();
    },
};
*/