---
layout: post
title: "Mybatis Demo"
description: ""
category: Mybatis
tags: [Mybatis, Derby]
---

### Mybatis 中特殊字符的处理
* 使用转义实体
```
下面是五个在XML 文档中预定义好的转义实体:
&lt; 􀃆 < 小于号
&gt; 􀃆 > 大于号
&amp; 􀃆 & 和
&apos; 􀃆 ' 单引号
&quot; 􀃆 " 双引号
如果是小于等于“<=”，其转义实体为：&lt;=
同理，大小等于“>=”，其转义实体为：&gt;=
```
* 使用CDATA 部件
```
一个CDATA 部件以"<![CDATA[" 标记开始，以"]]>"标记结束。在"<![CDATA["和"]]>"之间
的特殊字符的意义都不起作用，而转变为普通字符串内容。
```




### 错误解决
1. Q:The processing instruction must begin with the name of the target.   
A: 错误原因<? xml version="1.0" encoding="UTF-8" ?>这里面有空格

2. Q:Cannot find class: org.apache.derby.jdbc.EmbeddedDriver  
A: 需要导入derby的jar包 C:\Program Files\Sun\JavaDB\lib