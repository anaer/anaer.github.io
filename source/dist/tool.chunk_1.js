webpackJsonp([1],[,,,,function(t,e,n){"use strict";var i=n(2),r=n(20),a=n(19);t.exports=function(t){var e=$("<div></div>").setView(i());t.setView({title:"导航",viewList:[e,r,a]})}},,,,,,,,,,,,function(t,e,n){"use strict";function i(t,e){var n=RegExp("[一-龥]{0,}");return t.length>e?(n.test(t)&&e-4>0&&(e-=4),t.slice(0,e)+"..."):t}var r=n(3),a=n(21),o=[],s={},l=[],u=new Promise(function(t){BCD.ajaxCache("./json/link.json",function(e){return e.length?r.load(["source/lib/pinyinjs/dict/pinyin_dict_firstletter.js","source/lib/pinyinjs/pinyinUtil.js"],function(){o=[],s=[],l=[],e.forEach(function(t){var e=o.length;if(l[t.groupid]||(l[t.groupid]=0),(t.rows||[]).forEach(function(e){l[t.groupid]=l[t.groupid]+1;var n=e.split(" | "),r=pinyinUtil.getFirstLetter(n[0],!0).join(" ");if(n.length){var a="",s=n[1];if(s){var u=s.split("/");u[2]&&(a="./favicon/"+u[2].split(":")[0]+".ico")}var c={name:i(n[0],20),title:n[0],href:n[1],favicon:a,firstLetter:r,searchKey:n.concat(t.title,r).join(" ")};o.push(c)}}),t.groupid){var n={title:t.title,rows:o.slice(e),limit:t.limit||6};s[t.groupid]?s[t.groupid].push(n):s[t.groupid]=[n]}}),t(e)}):t(e),e.length?1:0},0,3e3,1)}).catch(function(t){return console.info(t)}),c=function(t){var e=a.getGlobalRegex(t,"i"),n=a.getGlobalRegex(t,"ig");return o.filter(function(t){return e.test(t.searchKey)}).map(function(e){var i=0,r={href:e.href,name:e.name.replace(n,function(t){return i+=3*t.length,'<span class="am-text-danger">'+t+"</span>"})};return t.length>1?r.searchHref=e.href.replace(n,function(t){return i+=t.length,'<span class="am-text-danger">'+t+"</span>"}):r.searchHref=e.href,e.firstLetter.replace(n,function(t){return i+=2*t.length,t}),r.weight=i,r}).sort(function(t,e){return e.weight-t.weight}).slice(0,10)};t.exports={getLinks:u,searchDirect:c,getLinksSync:function(){return o},getLinkTabSync:function(){return s}}},function(t,e,n){"use strict";var i=n(18);t.exports=function(t,e){var n=0,r=["","warning","danger","success"],a=function(){var a=r[n%4];n++;var s=$("<div></div>").setView(i({full:"append"}));e[o].forEach(function(t){t.style=a,s.reset(t)}),t.append(s)};for(var o in e)a()}},function(t,e){"use strict";BCD.addEvent("expand",function(t){t.on("click",function(e){t.find("ul.am-list > li.expand").toggleClass("am-hide")})}),t.exports=function(t){return $.extend({name:"common/linktab",template:'<div class="am-u-sm-12 am-u-md-6 am-u-lg-4">    <section class="am-panel am-panel-<%=obj.style||"secondary"%>"  data-on="?m=expand">        <header class="am-panel-hd" >            <h3 class="am-panel-title" ><%=obj.title%></h3>        </header>        <div class="am-panel-bd">            <ul class="am-list">                <%var list = obj.rows; for(var i=0, len=list.length; i<len; i++){%>                <%if(i < obj.limit){ %>                <li style="padding:8px">                  <span >                    <a data-on="?m=<%=config.isEnv ? "goEnv" : "go"%>&target=_blank" data-url="<%=list[i].href%>" title="<%=list[i].title%>">                      <img style="height:16px; width:16px" src="<%=list[i].favicon%>">  </img><%=list[i].name%>                    </a>                  </span>                <button style="display:none" type="button" class="am-btn am-btn-default am-btn-xs" style="float:right" data-on="?m=goQR<%=config.isEnv ? "&env=1" : ""%>" data-url="<%=list[i].href%>">QR</button>                </li>                <%} else {%>                <li style="padding:8px" class="expand am-hide" >                  <span >                    <a data-on="?m=<%=config.isEnv ? "goEnv" : "go"%>&target=_blank" data-url="<%=list[i].href%>" title="<%=list[i].title%>">                      <img style="height:16px; width:16px" src="<%=list[i].favicon%>">  </img><%=list[i].name%>                    </a>                  </span>                <button style="display:none" type="button" class="am-btn am-btn-default am-btn-xs" style="float:right" data-on="?m=goQR<%=config.isEnv ? "&env=1" : ""%>" data-url="<%=list[i].href%>">QR</button>                </li>                <%}%>                <%}%>            </ul>        </div>    </section></div>'},t)}},function(t,e,n){"use strict";var i=n(16),r=n(17),a=$('<div class="am-container"></div>');i.getLinks.then(function(t){r(a,i.getLinkTabSync())}),t.exports=a},function(t,e,n){"use strict";var i=n(16);BCD.addEvent("fast_input",function(t){var e=t.find("#content"),n=t.find('[data-selector="dropdown"]'),r=t.find("#notify"),a=t.find("#videoPlay");n.setView({name:"link/drop",template:'<ul><%(obj ||[]).forEach(function(o, i){%><li data-on="?m=open" data-url="<%=o.href%>"> <div class="left"><span class="am-badge am-round"><%=i%></span></div> <div class="right"><a><%=o.name%></a><div class="addr"><%=o.searchHref%></div></div></li><%})%></ul><div class="tips">提示：Tab键打开第一个链接、数字键打开对应链接、上下键选择、回车键打开、Esc键还原</div>',end:function(t){if(!t.length)return"hide"}});var o=null,s=null,l=-1,u="",c=function(){n.hide(),e.val(""),o=null,s=null,l=-1,u="",setTimeout(function(){return e[0].focus()},300)},f=function(){var t="https://www.baidu.com/s?wd="+encodeURIComponent(d());c(),window.open(t)},d=function(){return e.val().trim()};e.on("blur",function(){setTimeout(function(){n.hide()},300)}),r.on("click",function(){setTimeout(function(){var t=d();t&&($.ajax({url:"https://api2.pushdeer.com/message/push?pushkey=PDU3423TORUEz2NZHKZVIpSlb2ErGJcERTunXneI&text="+encodeURIComponent(t),type:"get",dataType:"jsonp",crossDomain:!0,data:{},success:function(t){}}),$(r).tip("已通知"))},300)}),a.on("click",function(){setTimeout(function(){var t=d();t&&(window.location.href="https://anaer.github.io/player/index.html?src="+t)},300)}),t.on("keydown",function(t){if(27==t.keyCode)return c();if(13==t.keyCode)return void(o?(o.trigger("click"),c()):f());if(s&&s.length){var e=d();if(t.keyCode>95&&t.keyCode<106&&!/^\d+$/.test(e))return void(s[t.keyCode-96]&&($(s[t.keyCode-96]).trigger("click"),setTimeout(c,100)));if(!(t.keyCode>47&&t.keyCode<58)||/^\d+$/.test(e))return 9==t.keyCode?($(s[0]).trigger("click"),setTimeout(c,100)):void(40!=t.keyCode&&38!=t.keyCode||(40==t.keyCode&&(l++,l>=s.length&&(l=0)),38==t.keyCode&&(l--,l<=-s.length&&(l=0)),s.css("background-color",""),o=s.eq(l),o.css("background-color","#b2d8fa")));if(s[t.keyCode-48])return $(s[t.keyCode-48]).trigger("click"),setTimeout(c,100)}}),t.on("input",function(t){var e=d();if(e&&e.length<25){if(e==u)return n.show();u=e;var r=i.searchDirect(e);r.length?(l=-1,o=null,n.reset(r),s=n.find("li")):n.hide()}else n.hide()})});var r=$('<div class="am-container">  <div class="am-margin-lg am-u-sm-11" style="padding:0" data-on="?m=fast_input">   <input id="content" type="text" class="am-form-field" style="ime-mode:active" autofocus="autofocus" placeholder="地址直达（支持拼音首字母）">   <div class="autocomplete-dropdown" data-selector="dropdown" style="display:none"></div>   <input id="notify" type="button" class="" style="" value="通知一下", title="在文本框中输入内容, 然后点击按钮可以通知作者." />   <input id="videoPlay" type="button" class="" style="" value="播放视频", title="在文本框中输入链接(flv/m3u8), 点击按钮播放." />  </div></div>').setView({name:"link/input"});t.exports=r},function(t,e){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}var i=function(t){return function(e){for(var n=[],i=e.length-t+1,r=0;r<i;r++)n.push(e.substr(r,t));return n}},r={4:i(4),3:i(3),2:i(2)},a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=[t],n=function(t){return t.replace(/['‘’][^'‘’]*['‘’]|["”“][^"”“]*["”“]/g,function(t){return e.push(t.replace(/['‘’"”“]/g,""))," "})},i=function(t){return t.replace(/[\u4e00-\u9fff\uf900-\ufaff]+/g,function(t){e.push(t);for(var n=4;n>1;n--)t.length>n&&e.push.apply(e,r[n](t));return" "})},a=function(t){e.push.apply(e,t.split(/[^a-zA-Z]/).filter(function(t){return t.length>2}).map(function(t){return t.toLowerCase()}))};return a(i(n(t))),e},o=function(t){return t=t.replace(/\s*```([^`\n\r]*)[^`]*```\s*/g,function(t,e){return" "+e+" "}),t=t.replace(/<[^\u4e00-\u9fff\uf900-\ufaff>]+>|\([^\u4e00-\u9fff\uf900-\ufaff)]+\)|\w+[:@][\w.?#=&\/]+/g," "),t=t.replace(/怎么|的|是|开始|很多|我|觉得|非常|可以|一|了|上面|下面|这|那|哪|个|this|return|with/g," "),t=t.replace(/[^\u4e00-\u9fff\uf900-\ufaff\w]/g," ")},s=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=a(o(t)).slice(1),n={},i={},s={},l=[];e.forEach(function(t){t.length<2||(s[t]?s[t]++:(3==t.length&&(n[t]=1),4==t.length&&(i[t]=1),s[t]=1))});var u,c=function(){var t=s[u];r[3](u).forEach(function(e){t===s[e]&&(delete s[e],delete n[e],r[2](e).forEach(function(e){t===s[e]&&delete s[e]}))})};for(u in i)c();var f=function(){var t=s[u];r[2](u).forEach(function(e){t===s[e]&&delete s[e]})};for(u in n)f();for(u in s)l.push({token:u,frequency:s[u]});return l.sort(function(t,e){return e.frequency-t.frequency})};t.exports={getWordList:a,getTFs:s,getGlobalRegex:function(t,e){var i=new Set(a(t)),r=[].concat(n(i));return new RegExp(r.join("|"),e||"ig")}}}]);
//# sourceMappingURL=tool.chunk_1.js.map