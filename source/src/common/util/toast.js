/**
 * @module {function} toast提示
 * @return {function}
 * @example
var m_toast = require('toast');
m_toast("显示toast", 100, "80%");
 * @param {string} content 内容
 * @param {number} second  秒
 * @param {string} bottom  底部位置
 * @author ljquan@qq.com
 */


module.exports = (function() {
    var oTip = document.createElement('div');
    oTip.setAttribute('style', 'position: fixed; top:' + (window.innerHeight / 3) + 'px; left:0px; right:0px;text-align:center; z-index:9999;');
    return function(text, second) { //支持new和直接的函数调用
        oTip.innerHTML = '<div style="display:inline-block; padding:20px 40px; background:rgba(0,0,0,0.6); -webkit-box-shadow:inset 0px 0px 1px #424242, 0px 1px 3px rgba(0,0,0,0.65); color:#fff; text-shadow:0px 1px 1px #9d9d9d; font-size:15px; border-radius:5px;">' + text + '</div>';
        oTip.style.top = (window.innerHeight / 3) + 'px';
        if (!oTip.parentNode) {
            document.body.appendChild(oTip);
            setTimeout(function() {
                document.body.removeChild(oTip);
            }, (second || 2) * 1000);
        }
    };
})();
