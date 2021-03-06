---
layout: post
title: "Javascript学习笔记"
description: ""
category: js
tags: [js]
---

#### [JS教程](http://www.w3school.com.cn/js/index.asp)

#### [JS简介](http://www.w3school.com.cn/js/js_intro.asp)

### [写入HTML输出](http://www.w3school.com.cn/tiy/t.asp?f=js_intro_document_write)

```html
document.write("纯文本");
document.write("<h1>带标签</h1>");
只能在 HTML 输出中使用 document.write。如果在文档加载后使用该方法，会覆盖整个文档。
```

### [对事件作出反应](http://www.w3school.com.cn/tiy/t.asp?f=js_intro_alert)
	原理: 添加按钮事件onclick,触发javascript方法function

	```html
	<button type="button" onclick="alert('弹出提示框')">提示</button>
	```

### [改变HTML内容](http://www.w3school.com.cn/tiy/t.asp?f=js_intro_inner_html)
	原理: 通过x=document.getElementById("id"); 找到元素
	      再通过x.innerHTML="改变内容";

### [改变HTML图像  ](http://www.w3school.com.cn/tiy/t.asp?f=js_lightbulb)
	原理: 添加onclick事件, 更换img src图片源

### [改变HTML样式](http://www.w3school.com.cn/tiy/t.asp?f=js_intro_style)

	```html
	x=document.getElementById("demo")  //找到元素
	x.style.color="#ff0000";           //改变样式
	```

### [验证输入](http://www.w3school.com.cn/tiy/t.asp?f=js_intro_validate)

	```html
	var x=document.getElementById("demo").value;
	if(x==""||isNaN(x))
	{
	alert("Not Numeric");
	}
	```

## [JS实现](http://www.w3school.com.cn/js/js_howto.asp)

  ```html
  HTML 中的脚本必须位于 <script> 与 </script> 标签之间。

  脚本可被放置在 HTML 页面的 <body> 和 <head> 部分中。
  那些老旧的实例可能会在 <script> 标签中使用 type="text/javascript"。现在已经不必这样做了。JavaScript 是所有现代浏览器以及 HTML5 中的默认脚本语言。
  JavaScript 语句，会在页面加载时执行。如果需要在某个事件发生时执行代码， 可以把 JavaScript 代码放入函数中，就可以在事件发生时调用该函数。
  通常的做法是把函数放入 <head> 部分中，或者放在页面底部。这样就可以把它们安置到同一处位置，不会干扰页面的内容。
  引入外部的Javascript

  <script type="text/javascript" src="/js/myScript.js"></script>
  ```

## [JS输出](http://www.w3school.com.cn/js/js_whereto.asp)

  ```html
  通过指定的 id 来访问 HTML 元素，并改变其内容
  <script>
  document.getElementById("demo").innerHTML="My First JavaScript";
  </script>

  <script>
  document.write("<p>My First JavaScript</p>");
  </script>
  如果在文档已完成加载后执行 document.write，整个 HTML 页面将被覆盖：
  ```

## [JS语句](http://www.w3school.com.cn/js/js_statements.asp)
  分号用于分隔 JavaScript 语句。在 JavaScript 中，用分号来结束语句是可选的。如果编写多条语句，可以使用分号分隔。
  浏览器会按照编写顺序来执行每条语句。
  JavaScript 对大小写敏感。
  JavaScript 会忽略多余的空格。
  可以在文本字符串中使用反斜杠对代码行进行换行。

  ```html
  document.write("Hello \
  World!");
  ```

## [JS注释](http://www.w3school.com.cn/js/js_comments.asp)

  ```html
  // 单行注释
  /*
  多
  行
  注
  释
  */
  ```

## [JS变量](http://www.w3school.com.cn/js/js_variables.asp)


# Javascript事件
  document.getElementById("id")
  Element.innerHTML = "内容"
# Javascript函数
  * str.match("matchtext")

# 按钮事件

# Javascript内置事件

# JS技巧

  javascript清空数组元素时，容易犯的错误：

  var myArray=[]；

  myArray = null；是错误的，个人感觉这样赋值后，myArray会从数组类型，变成字符串变量

  清空数组元素，应该myArray = [];

  或者myArray = new Array();

  javascript中数组声明：

  var myArray=new Array();

  或者var myArray=[]；

  javascript中数组常用函数：

  toString()：把数组转换成一个字符串
  toLocaleString()：把数组转换成一个字符串
  join()：把数组转换成一个用符号连接的字符串
  shift()：将数组头部的一个元素移出
  unshift()：在数组的头部插入一个元素
  pop()：从数组尾部删除一个元素
  push()：把一个元素添加到数组的尾部
  concat()：给数组添加元素
  slice()：返回数组的部分
  reverse()：将数组反向排序
  sort()：对数组进行排序操作
  splice()：插入、删除或者替换一个数组元素

  javascript的数组不需要设定长度，会自己进行扩展，数组名.length返回元素个数


---

# JavaScript--事件对象

  ```
  事件源对象 event.srcElement.tagName event.srcElement.type
  捕获释放 event.srcElement.setCapture(); event.srcElement.releaseCapture();
  事件按键 event.keyCode event.shiftKey event.altKey event.ctrlKey
  事件返回值 event.returnValue
  鼠标位置 event.x event.y
  窗体活动元素 document.activeElement
  绑定事件 document.captureEvents(Event.KEYDOWN);
  访问窗体元素 document.all("txt").focus(); document.all("txt").select();
  窗体命令 document.execCommand
  窗体COOKIE document.cookie
  菜单事件 document.oncontextmenu
  创建元素 document.createElement("SPAN");
  根据鼠标获得元素： document.elementFromPoint(event.x,event.y).tagName=="TD document.elementFromPoint(event.x,event.y).appendChild(ms)
  窗体图片 document.images[索引]
  窗体事件绑定 document.onmousedown=scrollwindow;
  元素 document.窗体.elements[索引]
  对象绑定事件 document.all.xxx.detachEvent('onclick',a);
  插件数目 navigator.plugins
  取变量类型 typeof($js_libpath) == "undefined"
  下拉框 下拉框.options[索引] 下拉框.options.length
  查找对象 document.getElementsByName("r1"); document.getElementById(id);
  定时 timer=setInterval('scrollwindow()',delay); clearInterval(timer);
  UNCODE编码 escape() ,unescape
  父对象 obj.parentElement(dhtml) obj.parentNode(dom)
  交换表的行 TableID.moveRow(2,1)
  替换CSS document.all.csss.href = "a.css";
  并排显示 display:inline
  隐藏焦点 hidefocus=true
  根据宽度换行 style="word-break:break-all"
  自动刷新 <meta HTTP-EQUIV="refresh" CONTENT="8;URL=http://c98.yeah.net">
  简单邮件 <a href="mailto:aaa@bbb.com?subject=ccc&body=xxxyyy">
  快速转到位置 obj.scrollIntoView(true)
  锚 <a name="first"> < a href="#first">anchors</a>
  网页传递参数 location.search();
  可编辑 obj.contenteditable=true
  执行菜单命令 obj.execCommand
  双字节字符 /[^"x00-"xff]/ 汉字 /["u4e00-"u9fa5]/
  让英文字符串超出表格宽度自动换行 word-wrap: break-word; word-break: break-all;
  透明背景 <IFRAME src="1.htm" width=300 height=180 allowtransparency></iframe>
  获得style内容 obj.style.cssText
  HTML标签 document.documentElement.innerHTML
  第一个style标签 document.styleSheets[0]
  style标签里的第一个样式 document.styleSheets[0].rules[0]
  防止点击空链接时，页面往往重置到页首端。 <a href="javascript:function()">word</a>
  上一网页源 asp: request.servervariables("HTTP_REFERER") javascript: document.referrer
  释放内存 CollectGarbage();
  禁止右键 document.oncontextmenu = function() { return false;}
  禁止保存 <noscript><iframe src="*.htm"></iframe></noscript>
  禁止选取<body oncontextmenu="return false" ondragstart="return false" onselectstart ="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false"onmouseup="document.selection.empty()>
  禁止粘贴 <input type=text onpaste="return false">
  地址栏图标 <link rel="Shortcut Icon" href="favicon.ico"> favicon.ico 名字最好不变16*16的16色,放虚拟目录根目录下
  收藏栏图标 <link rel="Bookmark" href="favicon.ico">
  查看源码 <input type=button value=查看网页源代码 onclick="window.location = 'view-source:'+ 'http://www.csdn.net/'">
  关闭输入法 <input style="ime-mode:disabled">
  自动全选 <input type=text name=text1 value="123" onfocus="this.select()">
  ENTER键可以让光标移到下一个输入框 <input onkeydown="if(event.keyCode==13)event.keyCode=9">
  文本框的默认值 <input type=text value="123" onfocus="alert(this.defaultValue)">
  title换行 obj.title = "123 sdfs "
  获得时间所代表的微秒 var n1 = new Date("2004-10-10".replace(/-/g, ""/")).getTime()
  窗口是否关闭 win.closed
  checkbox扁平 <input type=checkbox style="position: absolute; clip:rect(5px 15px 15px 5px)"><br>
  获取选中内容 document.selection.createRange().duplicate().text
  自动完成功能 <input type=text autocomplete=on>打开该功能 <input type=text autocomplete=off>关闭该功能
  窗口最大化 <body onload="window.resizeTo(window.screen.width - 4,window.screen.height-50);window.moveTo(-4,-4)">
  无关闭按钮IE window.open("aa.htm", "meizz", "fullscreen=7");
  统一编码/解码 alert(decodeURIComponent(encodeURIComponent("http://你好.com?as= hehe"))) encodeURIComponent对":"、"/"、";" 和 "?"也编码
  表格行指示 <tr onmouseover="this.bgColor='#f0f0f0'" onmouseout="this.bgColor='#ffffff'">
  ```


#### 银行卡号校验

  ```Javascript
  //Description:  银行卡号Luhm校验

//Luhm校验规则：16位银行卡号（19位通用）:

// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
// 3.将加法和加上校验位能被 10 整除。

//方法步骤很清晰，易理解，需要在页面引用Jquery.js


//bankno为银行卡号 banknoInfo为显示提示信息的DIV或其他控件
function luhmCheck(bankno){
    var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

    var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9

    var arrOuShu=new Array();  //偶数位数组
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9)
            arrJiShu.push(parseInt(newArr[j])*2);
            else
            arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else //偶数位
        arrOuShu.push(newArr[j]);
    }

    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }

    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }

    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }

    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
    var luhm= 10-k;

    if(lastNum==luhm){
    $("#banknoInfo").html("Luhm验证通过");
    return true;
    }
    else{
    $("#banknoInfo").html("银行卡号必须符合Luhm校验");
    return false;
    }
}
  ```

#### style.display

   ```
   style.display = ""；是清除display样式，display将使用默认值（块元素会变成block，内联元素会变成inline）
   style.display="none"； 中“none”是一个值，表示元素将隐藏
   ```

#### html编码解码

```javascript

function html_encode(str)
{
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  //s = s.replace(/ /g, "&nbsp;");
  s = s.replace(/\'/g, "&#39;");
  s = s.replace(/\"/g, "&quot;");
  //s = s.replace(/\n/g, "<br>");
  return s;
}

function html_decode(str)
{
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&gt;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, " ");
  s = s.replace(/&#39;/g, "\'");
  s = s.replace(/&quot;/g, "\"");
  s = s.replace(/<br>/g, "\n");
  return s;
}
```

#### js获取星期几

```js
var week;
if(new Date().getDay()==0)          week="星期日"
if(new Date().getDay()==1)          week="星期一"
if(new Date().getDay()==2)          week="星期二"
if(new Date().getDay()==3)          week="星期三"
if(new Date().getDay()==4)          week="星期四"
if(new Date().getDay()==5)          week="星期五"
if(new Date().getDay()==6)          week="星期六"
```


#### js 数组获取

    mm 超出范围时, 取''
    var month = ['January', 'February', 'March',
             'April', 'May', 'June', 'July',
             'August', 'September', 'October',
             'November', 'December'
            ][mm-1] || '';

### 参考
  * [辛星解读Javascript](http://blog.csdn.net/column/details/xinxingjs.html)
  * [Javascript教程](http://www.w3school.com.cn/js/index.asp)
  * [Javascript新手教程](http://js101.co/)

#### 使用JavaScript
  * [使用javascript实现银行卡号的Luhn校验或验证算法](http://www.oschina.net/code/snippet_169741_5774)
  * [项目中常用js方法整理common.js ](http://blog.csdn.net/sweetsuzyhyf/article/details/41309863)
#### js技巧
  * [js获取星期几  ](http://blog.163.com/zl_zhang_lin@yeah/blog/static/124255113201061524033321/)
