---
layout: post
title: "Javascript学习笔记"
description: ""
category: Javascript
tags: [Javascript]
---

# [JS教程](http://www.w3school.com.cn/js/index.asp)

## [JS简介](http://www.w3school.com.cn/js/js_intro.asp)

### [写入HTML输出](http://www.w3school.com.cn/tiy/t.asp?f=js_intro_document_write)  
	
	```html
	document.write("纯文本");
	document.write("<h1>带标签</h1>");
	```
	
	只能在 HTML 输出中使用 document.write。如果在文档加载后使用该方法，会覆盖整个文档。

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

	

---

# 参考

  * [辛星解读Javascript](http://blog.csdn.net/column/details/xinxingjs.html)  
  * [Javascript教程](http://www.w3school.com.cn/js/index.asp)
