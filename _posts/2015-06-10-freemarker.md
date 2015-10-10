---
layout: post
title: "FreeMarker模板引擎"
description: "FreeMarker模板引擎"
category:FreeMarker
tags: [FreeMarker]
---

####freemarker 替换(方括号)语法

注意:
这个特性从 FreeMarker 2.3.4 版本后才可用。

FreeMarker 支持一个替换的语法。就是在 FreeMarker 的指令和注释中用 [ 和 ] 来代替 <和 > ,例如下面这个例子:

调用预定义指令: [#list animals as being]...[/#list]
调用自定义指令: [@myMacro /]
注释: [#-- the comment --]


为了使用这种语法从而代替默认语法,从模板开始,使用 ftl 指令都要使用这用语法。如果你不知道什么是 ftl 指令,那么就用 [#ftl] 来开始模板,要记住这个要放在文件的最前面(除了它前面的空格)。例如,下面的示例入门章节的最后一个例子使用这种替换语法的样子

```
[#ftl]
<p>We have these animals:
<table border=1>
<tr><th>Name<th>Price
[#list animals as being]
<tr>
<td>
[#if being.size = "large"]<b>[/#if]
${being.name}
[#if being.size = "large"]</b>[/#if]
<td>${being.price} Euros
[/#list]
</table>
```

这种替换语法(方括号)和默认语法(尖括号)在一个模板中是相互排斥的。那就是说,整个模板要么全部使用替换语法,要么全部使用默认语法。如果模板使用了替换语法,那么如 <#if ...> 这样的部分就会被算作是静态文本,而不是 FTL 标签了。类似地,如果模板使用默认语法,那么如 [#if ...] 这样的也会被算作是静态文本,而不是 FTL 标签。

```
如果你以 [#ftl ...] ( ... 代表可选的参数列表,当然仅用 [#ftl]s 也行)来开始文件,那文件就会使用替换(方括号)语法。如果使用 <#ftl ...> 来开始,那么文件就会使用正常(尖括号)语法。如果文件中没有 ftl 指令,那么程序员可以通过配置FreeMarker(程序员参看 API 文档的 Configuration.setTagSyntax(int) 来使用)来决定使用哪种语法。但是程序员可能使用默认配置。FreeMarker 2.3.x 版本默认配置
使用常规语法。而 2.4 版本中的默认配置将会自动检测,也就是说第一个 FreeMarker 标签决定了语法形式(它可以是任意的,而不仅仅是 ftl )。
```

### 参考
* [freemarker 轮换(方括号)语法](http://www.ylzx8.cn/web/web/1655862.html)
