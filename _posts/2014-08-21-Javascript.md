---
layout: post
title: "Javascript学习笔记"
description: ""
category: Javascript
tags: [Javascript]
---

# Javascript教程笔记  
  * 写入HTML输出  
	
	```html
	<!DOCTYPE html>
	<html>
	<body>

	<p>
	JavaScript 能够直接写入 HTML 输出流中：
	</p>

	<script>
	document.write("纯文本");
	document.write("<h1>带标签</h1>");
	</script>

	<p>
	您只能在 HTML 输出流中使用 <strong>document.write</strong>。
	如果您在文档已加载后使用它（比如在函数中），会覆盖整个文档。
	</p>

	</body>
	</html>
	```

	只能在 HTML 输出中使用 document.write。如果在文档加载后使用该方法，会覆盖整个文档。

  *

---

# 参考

  * [辛星解读Javascript](http://blog.csdn.net/column/details/xinxingjs.html)  
  * [Javascript教程](http://www.w3school.com.cn/js/index.asp)
