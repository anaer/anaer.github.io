webpackJsonp([0],[,,,,,,,,,,,,,function(n,t,e){"use strict";var i=e(14);n.exports=function(n,t){var e=0,a=["","warning","danger","success"],r=function(){var r=a[e%4];e++;var s=$("<div></div>").setView(i({full:"append"}));t[o].forEach(function(n){n.style=r,s.reset(n)}),n.append(s)};for(var o in t)r()}},function(n,t){"use strict";BCD.addEvent("expand",function(n){n.on("click",function(t){n.find("ul.am-list > li.expand").toggleClass("am-hide")})}),n.exports=function(n){return $.extend({name:"common/linktab",template:'<div class="am-u-sm-12 am-u-md-6 am-u-lg-4">    <section class="am-panel am-panel-<%=obj.style||"secondary"%>"  data-on="?m=expand">        <header class="am-panel-hd" >            <h3 class="am-panel-title" ><%=obj.title%></h3>        </header>        <div class="am-panel-bd">            <ul class="am-list">                <%var list = obj.rows; for(var i=0, len=list.length; i<len; i++){%>                <%if(i < obj.limit){ %>                <li style="padding:8px">                  <span >                    <a data-on="?m=<%=config.isEnv ? "goEnv" : "go"%>&target=_blank" data-url="<%=list[i].href%>" title="<%=list[i].title%>">                      <img style="height:16px; width:16px" src="<%=list[i].favicon%>">  </img><%=list[i].name%>                    </a>                  </span>                <button style="display:none" type="button" class="am-btn am-btn-default am-btn-xs" style="float:right" data-on="?m=goQR<%=config.isEnv ? "&env=1" : ""%>" data-url="<%=list[i].href%>">QR</button>                </li>                <%} else {%>                <li style="padding:8px" class="expand am-hide" >                  <span >                    <a data-on="?m=<%=config.isEnv ? "goEnv" : "go"%>&target=_blank" data-url="<%=list[i].href%>" title="<%=list[i].title%>">                      <img style="height:16px; width:16px" src="<%=list[i].favicon%>">  </img><%=list[i].name%>                    </a>                  </span>                <button style="display:none" type="button" class="am-btn am-btn-default am-btn-xs" style="float:right" data-on="?m=goQR<%=config.isEnv ? "&env=1" : ""%>" data-url="<%=list[i].href%>">QR</button>                </li>                <%}%>                <%}%>            </ul>        </div>    </section></div>'},n)}},function(n,t,e){"use strict";var i={string_split:e(19),string_match:e(17),string_plus__vs__array_push:e(18),white_list_good:e(21),white_list_bad:e(20),initial:e(16)},a=[{title:"字符串相关",rows:["string_match","string_split","string_plus__vs__array_push",{name:"string-startswith",href:"https://jsperf.com/string-startswith/48"}]},{title:"数据结构",rows:["initial","white_list_good","white_list_bad"]},{title:"数组相关",rows:[{name:"for vs map vs foreach vs reduce",href:"https://jsperf.com/for-map-foreach-reduce"}]}],r=0,o=[],s=location.origin+"/benchmark.html";a.forEach(function(n,t){o[r]||(o[r]=[]),o[r].push({title:n.title,rows:n.rows.map(function(n){return BCD.is.o(n)?n:{name:n,href:s+location.search+"#!/"+n}})}),t%2==1&&r++}),n.exports={benchDict:i,daohangList:o}},function(n,t){"use strict";n.exports='\n// 各种数据初始化\n[{\n  name: "Object",\n  fun: function () {\n    var a = {};\n  }\n}, {\n  name: "Object#new",\n  fun: function () {\n    var a = new Object();\n  }\n}, {\n  name: "Object#new2",\n  fun: function () {\n    var a = new Object;\n  }\n}, {\n  name: "String",\n  fun: function () {\n    var a = \'\';\n  }\n}, {\n  name: "Array",\n  fun: function () {\n    var a = [];\n  }\n}, {\n  name: "Array#new",\n  fun: function () {\n    var a = new Array;\n  }\n}, {\n  name: "Array#new2",\n  fun: function () {\n    var a = new Array();\n  }\n}, {\n  name: "Number",\n  fun: function () {\n    var a = 1.1;\n  }\n}, {\n  name: "Boolean",\n  fun: function () {\n    var a = true;\n  }\n}, {\n  name: "Boolean#Invert",\n  fun: function () {\n    var a = !0;\n  }\n}]\n'},function(n,t){"use strict";n.exports='\n// 是否包含某些字符串\n[{\n  name: "RegExp#test",\n  fun: function () {\n    /o/.test("Hello World!");\n  }\n}, {\n  name: "String#indexOf",\n  fun: function () {\n    "Hello World!".indexOf("o") > -1;\n  }\n}, {\n  name: "String#match",\n  fun: function () {\n    !!"Hello World!".match(/o/);\n  }\n}]\n'},function(n,t){"use strict";n.exports='\n// 字符串拼接形式, 模拟模板函数，一般模板大约需要拼接30段字符串\n// 需要拼接的字符串长度越长，字符串的方式越明显，push多个并不会有优势\n[{\n  name: "string plus",\n  fun: function () {\n    var str = "";\n    for(var i=10000; i<10030; i++){\n      str += i.toString();\n    }\n    return str;\n  }\n}, {\n  name: "array push",\n  fun: function () {\n    var arr = [];\n    for(var i=10000; i<10030; i++){\n      arr.push(i.toString());\n    }\n    return arr.join(\'\');\n  }\n}, {\n  name: "array push multiple",\n  fun: function () {\n    var arr = [];\n    for(var i=10000; i<10030; i++){\n      arr.push(i.toString(), (i++).toString(), (i++).toString(), (i++).toString(), (i++).toString());\n    }\n    return arr.join(\'\');\n  }\n}]\n'},function(n,t){"use strict";n.exports="\n// split的执行效率\n[{\n  name: \"RegExp#replace\",\n  fun: function () {\n    return \"%y%M%d%h%m%s\".replace(new RegExp('h'+'.*$'),'h');\n  }\n}, {\n  name: \"String#split\",\n  fun: function () {\n    var arr = \"%y%M%d%h%m%s\".split('h');\n    return arr[1] ? arr[0]+'h' : arr[0];\n  }\n}, {\n  name: \"String#indexOf\",\n  fun: function () {\n    var s = \"%y%M%d%h%m%s\";\n    return s.substring(0, (s.indexOf('h') + 1)||12);\n  }\n}]\n"},function(n,t){"use strict";n.exports='\n// 白名单策略，最差的情况（对于数组是遍历完最后一个元素）\n[{\n    name: "RegExp#test",\n    fun: function () {\n        return /m=getSignInfo|sign/.test("//liquidliang.cc/ajax?aid=20&uid=791756267&t=1492498034551");\n    }\n}, {\n    name: "RegExp#mutiple",\n    fun: function () {\n        return /m=getSignInfo|sign|m=getSignInfo|sign/.test("//liquidliang.cc/ajax?aid=20&uid=791756267&t=1492498034551");\n    }\n}, {\n    name: "array#indexOf",\n    fun: function () {\n        return [\'m=getSignInfo\', \'sign\', \'m=getSignInfo\', \'sign\'].some(function (o) {\n            return "//liquidliang.cc/ajax?aid=20&uid=791756267&t=1492498034551".indexOf(o) > -1;\n        });\n    }\n}, {\n    name: "dict#indexOf",\n    fun: function () {\n        var dict = {\n            \'m=getSignInfo\': 1,\n            \'sign\': 1\n        };\n        for (var key in dict) {\n            if ("//liquidliang.cc/ajax?aid=20&uid=791756267&t=1492498034551".indexOf(key) > -1) {\n                return true;\n            }\n        }\n        return false;\n    }\n}]\n'},function(n,t){"use strict";n.exports='\n// 白名单策略，最好的情况（对于数组是遍历到第一个元素即结束循环）\n[{\n    name: "RegExp#test",\n    fun: function () {\n        return /m=getSignInfo|sign/.test("//liquidliang.cc/ajax?m=getSignInfo&aid=20&uid=791756267&t=1492498034551");\n    }\n}, {\n    name: "RegExp#mutiple",\n    fun: function () {\n        return /m=getSignInfo|sign|m=getSignInfo|sign/.test("//liquidliang.cc/ajax?m=getSignInfo&aid=20&uid=791756267&t=1492498034551");\n    }\n}, {\n    name: "array#indexOf",\n    fun: function () {\n        return [\'m=getSignInfo\', \'sign\', \'m=getSignInfo\', \'sign\'].some(function (o) {\n            return "//liquidliang.cc/ajax?m=getSignInfo&aid=20&uid=791756267&t=1492498034551".indexOf(o) > -1;\n        });\n    }\n}, {\n    name: "dict#indexOf",\n    fun: function () {\n        var dict = {\n            \'m=getSignInfo\': 1,\n            \'sign\': 1\n        };\n        for (var key in dict) {\n            if ("//liquidliang.cc/ajax?m=getSignInfo&aid=20&uid=791756267&t=1492498034551".indexOf(key) > -1) {\n                return true;\n            }\n        }\n        return false;\n    }\n}]\n'},function(n,t,e){"use strict";var i=e(12),a=e(13),r=e(15);n.exports=function(n){var t=$("<div></div>").setView(i()),e=$("<div/>");a(e,r.daohangList),n.setView({title:"性能基准测试",viewList:[t,e]})}},function(n,t,e){"use strict";var i=e(12),a=e(34);n.exports=function(n){var t=$("<div></div>").setView(i());n.setView({title:"模板可视化编辑",viewList:[t,a]})}},function(n,t,e){"use strict";var i=e(12),a=e(35),r=e(33);n.exports=function(n){var t=$("<div></div>").setView(i());n.setView({title:"导航",viewList:[t,a,r]})}},function(n,t,e){"use strict";var i=e(12),a=e(36),r=e(37);n.exports=function(n,t){var e=$("<div></div>").setView(i()),o=$('<div class="am-container"></div>').setView(a({getData:function(){return{href:BCD.getHash(1)||location.href}}}));n.setView({title:"二维码",viewList:[e,r,o]})}},,,,,,,function(n,t,e){"use strict";function i(n,t){var e=RegExp("[一-龥]{0,}");return n.length>t?(e.test(n)&&t-4>0&&(t-=4),n.slice(0,t)+"..."):n}var a=e(1),r=e(38),o=[],s={},c=[],l=new Promise(function(n){BCD.ajaxCache("./json/link.json",function(t){return t.length?a.load(["source/lib/pinyinjs/dict/pinyin_dict_firstletter.js","source/lib/pinyinjs/pinyinUtil.js"],function(){o=[],s=[],c=[],t.forEach(function(n){var t=o.length;if(c[n.groupid]||(c[n.groupid]=0),(n.rows||[]).forEach(function(t){c[n.groupid]=c[n.groupid]+1;var e=t.split(" | "),a=pinyinUtil.getFirstLetter(e[0],!0).join(" ");if(e.length){var r="",s=e[1];if(s){var l=s.split("/");l[2]&&(r="https://statics.dnspod.cn/proxy_favicon/_/favicon?domain="+l[2])}var u={name:i(e[0],20),title:e[0],href:e[1],favicon:r,firstLetter:a,searchKey:e.concat(n.title,a).join(" ")};o.push(u)}}),n.groupid){var e={title:n.title,rows:o.slice(t),limit:n.limit||6};s[n.groupid]?s[n.groupid].push(e):s[n.groupid]=[e]}}),n(t)}):n(t),t.length?1:0},0,3e3,1)}).catch(function(n){return console.info(n)}),u=function(n){var t=r.getGlobalRegex(n,"i"),e=r.getGlobalRegex(n,"ig");return o.filter(function(n){return t.test(n.searchKey)}).map(function(t){var i=0,a={href:t.href,name:t.name.replace(e,function(n){return i+=3*n.length,'<span class="am-text-danger">'+n+"</span>"})};return n.length>1?a.searchHref=t.href.replace(e,function(n){return i+=n.length,'<span class="am-text-danger">'+n+"</span>"}):a.searchHref=t.href,t.firstLetter.replace(e,function(n){return i+=2*n.length,n}),a.weight=i,a}).sort(function(n,t){return t.weight-n.weight}).slice(0,10)};n.exports={getLinks:l,searchDirect:u,getLinksSync:function(){return o},getLinkTabSync:function(){return s}}},function(n,t,e){"use strict";var i=e(32),a=e(13),r=$('<div class="am-container"></div>');i.getLinks.then(function(n){a(r,i.getLinkTabSync())}),n.exports=r},function(n,t,e){"use strict";function i(){o.find(".am-tabs-nav li").removeClass("am-active"),l.addClass("am-active"),$(".am-tab-panel").removeClass("am-active"),d.addClass("am-active");var n=a.getValue();c.val("        '"+n.split("\n").join("'+\n        '")+"',")}var a,r=e(1),o=$('<div class="am-container">   <div style="margin-top:20px"><div data-selector="code"  Columns="500"></div></div>   <div data-am-widget="tabs" class="am-tabs am-tabs-default">  <ul class="am-tabs-nav am-cf">    <li data-selector="mod" class="am-active"><a>复制模板</a></li>    <li data-selector="remod" class="">按模板更新</li>    <li data-selector="view" class=""><a>更新视图</a></li>    <li data-selector="review" class="">按视图更新</li>  </ul>  <div class="am-tabs-bd">    <div data-selector="tab_mod" class="am-tab-panel am-active"><textarea id="fe_text" data-selector="dis" class="am-form-field am-radius" rows="20" placeholder = "鼠标点此处生成"></textarea></div>    <div data-selector="tab_view" class="am-tab-panel " style="min-height:200px"></div></div></div>'),s=o.find('[data-selector="code"]'),c=o.find('[data-selector="dis"]'),l=o.find('[data-selector="mod"]'),u=o.find('[data-selector="view"]'),d=o.find('[data-selector="tab_mod"]'),f=o.find('[data-selector="tab_view"]');u.on("click",function(){o.find(".am-tabs-nav li").removeClass("am-active"),u.addClass("am-active"),$(".am-tab-panel").removeClass("am-active"),f.addClass("am-active").html(a.getValue())}),o.find('[data-selector="review"]').on("click",function(){a.setValue(f.html().replace(/([^>])\n\s*/g,function(n,t){return t}))}),o.find('[data-selector="remod"]').on("click",function(){a.setValue(c.val().replace(/^\s*'/,"").replace(/'\s*\+\s*\n\s*'/g,"\n").replace(/'[,\s\n+]*$/,""))}),r.load(["./source/lib/codemirror/lib/codemirror.css","./source/lib/codemirror/addon/hint/show-hint.css","./source/lib/codemirror/lib/codemirror.js","./source/lib/codemirror/addon/hint/show-hint.js","./source/lib/codemirror/addon/hint/xml-hint.js","./source/lib/codemirror/addon/hint/html-hint.js","./source/lib/codemirror/mode/xml/xml.js","./source/lib/codemirror/mode/javascript/javascript.js","./source/lib/codemirror/mode/css/css.js","./source/lib/codemirror/mode/htmlmixed/htmlmixed.js","./source/lib/zeroclipboard/ZeroClipboard.js"],function(){ZeroClipboard.config({swfPath:"./source/lib/zeroclipboard/ZeroClipboard.swf",moviePath:"./source/lib/zeroclipboard/ZeroClipboard.swf"});var n=new ZeroClipboard(l[0]);n.on("ready",function(){this.on("copy",function(n){i(),n.clipboardData.setData("text/plain",c.val())}),this.on("aftercopy",function(n){r.toast("已复制到粘贴板")})}),ZeroClipboard.setData("text/plain","txt"),o.setView({end:function(){a||(a=CodeMirror(s[0],{mode:"text/html",styleActiveLine:!0,lineNumbers:!0,lineWrapping:!0,autofocus:!0,extraKeys:{"Ctrl-1":"autocomplete"}}))}}),o.reset()}),n.exports=o},function(n,t,e){"use strict";var i=e(32);BCD.addEvent("fast_input",function(n){var t=n.find("#content"),e=n.find('[data-selector="dropdown"]'),a=n.find("#notify");e.setView({name:"link/drop",template:'<ul><%(obj ||[]).forEach(function(o, i){%><li data-on="?m=open" data-url="<%=o.href%>"> <div class="left"><span class="am-badge am-round"><%=i%></span></div> <div class="right"><a><%=o.name%></a><div class="addr"><%=o.searchHref%></div></div></li><%})%></ul><div class="tips">提示：Tab键打开第一个链接、数字键打开对应链接、上下键选择、回车键打开、Esc键还原</div>',end:function(n){if(!n.length)return"hide"}});var r=null,o=null,s=-1,c="",l=function(){e.hide(),t.val(""),r=null,o=null,s=-1,c="",setTimeout(function(){return t[0].focus()},300)},u=function(){var n="https://www.baidu.com/s?wd="+encodeURIComponent(d());l(),window.open(n)},d=function(){return t.val().trim()};t.on("blur",function(){setTimeout(function(){e.hide()},300)}),a.on("click",function(){setTimeout(function(){var n=d();n&&($.ajax({url:"https://api2.pushdeer.com/message/push?pushkey=PDU3423TORUEz2NZHKZVIpSlb2ErGJcERTunXneI&text="+encodeURIComponent(n),type:"get",dataType:"jsonp",crossDomain:!0,data:{},success:function(n){}}),$(a).tip("已通知"))},300)}),n.on("keydown",function(n){if(27==n.keyCode)return l();if(13==n.keyCode)return void(r?(r.trigger("click"),l()):u());if(o&&o.length){var t=d();if(n.keyCode>95&&n.keyCode<106&&!/^\d+$/.test(t))return void(o[n.keyCode-96]&&($(o[n.keyCode-96]).trigger("click"),setTimeout(l,100)));if(!(n.keyCode>47&&n.keyCode<58)||/^\d+$/.test(t))return 9==n.keyCode?($(o[0]).trigger("click"),setTimeout(l,100)):void(40!=n.keyCode&&38!=n.keyCode||(40==n.keyCode&&(s++,s>=o.length&&(s=0)),38==n.keyCode&&(s--,s<=-o.length&&(s=0)),o.css("background-color",""),r=o.eq(s),r.css("background-color","#b2d8fa")));if(o[n.keyCode-48])return $(o[n.keyCode-48]).trigger("click"),setTimeout(l,100)}}),n.on("input",function(n){var t=d();if(t){if(t==c)return e.show();c=t;var a=i.searchDirect(t);a.length?(s=-1,r=null,e.reset(a),o=e.find("li")):e.hide()}else e.hide()})});var a=$('<div class="am-container">  <div class="am-margin-lg am-u-sm-11" style="padding:0" data-on="?m=fast_input">   <input id="content" type="text" class="am-form-field" style="ime-mode:active" autofocus="autofocus" placeholder="地址直达（支持拼音首字母）">   <div class="autocomplete-dropdown" data-selector="dropdown" style="display:none"></div>   <input id="notify" type="button" class="" style="" value="通知一下", title="在文本框中输入内容, 然后点击按钮可以通知作者." />  </div></div>').setView({name:"link/input"});n.exports=a},function(n,t,e){"use strict";var i=e(1);BCD.addEvent("draw_qr",function(n,t,e){i.load("./source/lib/qrcode.js",function(){var e=new QRCodeLib.QRCodeDraw;e.draw(n[0],t.url,function(n,t){if(n)return console.log("Error =( ",n)})})}),n.exports=function(n){return $.extend({name:"tool/qr",template:'<div style="height: 350px;margin: 10px;">  <div><br><%var href=decodeURIComponent(obj.href);%><a href="<%=href%>" target="_blank"><%=href%></a></div><ul class="QR-list">  <li style="padding-right:200px;">    <canvas title="二维码" style="width: 368px;height:368px;" data-on="?m=draw_qr" data-url="<%=href%>"></canvas>  </li></ul>'},n)}},function(n,t){"use strict";function e(){BCD.replaceHash("#!/qrcode/"+encodeURIComponent(a.val()))}var i=$('<div class="am-container am-form-inline">    <div class="am-form-group" style="width: 80%;">    <input data-selector="input" type="text" class="am-form-field" placeholder="输入url" style="width: 100%;">  </div>    <button data-selector="submit" type="button" class="am-btn am-btn-secondary" style="width: 8%;">执行</button>  <button data-selector="clean" type="button" class="am-btn am-btn-default" style="width: 8%;">清空</button></div>').setView({start:function(){var n=BCD.getHash(1);a.val(decodeURIComponent(n||""))}}),a=$(i.find('[data-selector="input"]')),r=$(i.find('[data-selector="submit"]')),o=$(i.find('[data-selector="clean"]'));r.click(e),a.on("keydown",function(n){n||(n=window.event),13==(n.keyCode||n.which)&&e()}),o.on("click",function(){a.val(""),BCD.replaceHash("#!/qrcode/")}),n.exports=i},function(n,t){"use strict";function e(n){if(Array.isArray(n)){for(var t=0,e=Array(n.length);t<n.length;t++)e[t]=n[t];return e}return Array.from(n)}var i=function(n){return function(t){for(var e=[],i=t.length-n+1,a=0;a<i;a++)e.push(t.substr(a,n));return e}},a={4:i(4),3:i(3),2:i(2)},r=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[n],e=function(n){return n.replace(/['‘’][^'‘’]*['‘’]|["”“][^"”“]*["”“]/g,function(n){return t.push(n.replace(/['‘’"”“]/g,""))," "})},i=function(n){return n.replace(/[\u4e00-\u9fff\uf900-\ufaff]+/g,function(n){t.push(n);for(var e=4;e>1;e--)n.length>e&&t.push.apply(t,a[e](n));return" "})},r=function(n){t.push.apply(t,n.split(/[^a-zA-Z]/).filter(function(n){return n.length>2}).map(function(n){return n.toLowerCase()}))};return r(i(e(n))),t},o=function(n){return n=n.replace(/\s*```([^`\n\r]*)[^`]*```\s*/g,function(n,t){return" "+t+" "}),n=n.replace(/<[^\u4e00-\u9fff\uf900-\ufaff>]+>|\([^\u4e00-\u9fff\uf900-\ufaff)]+\)|\w+[:@][\w.?#=&\/]+/g," "),n=n.replace(/怎么|的|是|开始|很多|我|觉得|非常|可以|一|了|上面|下面|这|那|哪|个|this|return|with/g," "),n=n.replace(/[^\u4e00-\u9fff\uf900-\ufaff\w]/g," ")},s=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=r(o(n)).slice(1),e={},i={},s={},c=[];t.forEach(function(n){n.length<2||(s[n]?s[n]++:(3==n.length&&(e[n]=1),4==n.length&&(i[n]=1),s[n]=1))});var l,u=function(){var n=s[l];a[3](l).forEach(function(t){n===s[t]&&(delete s[t],delete e[t],a[2](t).forEach(function(t){n===s[t]&&delete s[t]}))})};for(l in i)u();var d=function(){var n=s[l];a[2](l).forEach(function(t){n===s[t]&&delete s[t]})};for(l in e)d();for(l in s)c.push({token:l,frequency:s[l]});return c.sort(function(n,t){return t.frequency-n.frequency})};n.exports={getWordList:r,getTFs:s,getGlobalRegex:function(n,t){var i=new Set(r(n)),a=[].concat(e(i));return new RegExp(a.join("|"),t||"ig")}}}]);
//# sourceMappingURL=tool.chunk_0.js.map