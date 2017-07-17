var m_util = require('common/util');
var tips = $('<div class="mouse_tips"></div>');
var halfWidth = m_util.getWindowWidth()/2;
var halfHeight =  m_util.getWindowHeight()/2;
function bindShowTips(ele, fun){
    ele.on('mouseover', function(e) {
        var page = ele.getPage();
        var rectPage = m_util.getElementRect(page);
        var rectEle = m_util.getElementRect(ele);

        var positionX = 'left:' + (e.pageX + 30) + 'px;'
        var positionY = 'top:' + e.pageY + 'px;'
        var maxWidth = rectPage.width/2;
        var maxHeight = rectPage.height/2;
        if(e.pageX > halfWidth){
            positionX = 'right: ' + (rectPage.right - rectEle.left) + 'px;'
        }
        if(e.pageY > halfHeight){
            positionY = 'bottom:' + (rectPage.bottom - rectEle.top) + 'px;'
        }
        tips.attr('style', 'position:absolute;' +positionY +positionX+' padding:10px; max-height:'+(maxHeight-30)+'px; max-width:'+halfWidth+'px;display: table;');
        fun(tips);
        $('body').append(tips);
    });

    ele.on('mouseout', function(e) {
        tips.remove();
    });
}

//事件绑定
module.exports = bindShowTips;