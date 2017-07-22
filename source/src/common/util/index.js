/*
依赖于Zepto的extend方法
 */
var util = {};


var m_toast = require('./toast');

$.extend(util, {
    /*
        abs: abs,
        separateTime: separateTime,
        getParamObj: getParamObj,
        getParam: getParam,
        setParam: setParam
     */
    url: BCD.url,
    toast: m_toast,
    load: require('./load')
});


$.extend(util, {
    ua: navigator.userAgent,
    //获取系统信息
    getElementRect: function(ele) {
        try {
            return $(ele)[0].getBoundingClientRect(); //该方法是在IE 5中引入的，而现在当前的所有浏览器都实现了。返回一个有left、right、top和bottom属性的对象。
        } catch (e) {
            return {};
        }
    },
    getWindowHeight: function() {
        return window.innerHeight || window.clientHeight;
    },
    getWindowWidth: function() {
        return window.innerWidth;
    },
    getPageHeight: function() {
        return document.body.scrollHeight || document.documentElement.scrollHeight;
    },
    getEleTopHeight: function(ele) {
        ele = $(ele)[0];
        var height = 0;
        while (ele) {
            height += ele.offsetTop || 0;
            ele = ele.offsetParent;
        }
        return height;
    },
    getScrollTop: function() { //参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollY
        return window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    },
    scrollTo: function(x, y) {
        window.scrollTo(x, y);
    },
    //字符填充,长度补齐方法，左边填充
    leftFillString: function(num, length) {
        return ("0000000000" + num).substr(-length);
    },
    toastNetWorkError: function() {
        m_toast('网络不给力，查看下吧');
    },
    htmlEncode: function(str) {
        return $('<a></a>').text(str || '').html();
    },
    htmlDecode: function(str) {
        return $('<a></a>').html(str || '').text();
    }
});

util.ajax = function(options) {
    var promise = new Promise(function(resolve, reject) {
        if(BCD.is.s(options)){
          options = {
            url: options
          };
        }
        $.ajax($.extend({
            dataType: "json",
            cache:  false,
            timeout: 8e3,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }, options, {
            success: function(data){
                resolve(data);
                if(options.success){
                    options.success(data);
                }
            },
            error: function(){
                resolve(false);
                if(options.errors){
                    options.errors.apply(this, arguments);
                }else{
                    util.toastNetWorkError();
                }
            }
        }));
    });
    return promise;
};


module.exports = window.UTIL = util;
