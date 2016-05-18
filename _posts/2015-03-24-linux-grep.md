---
layout: post
title: "linux grep命令"
description: ""
category: Linux
tags: [Linux]
---

* grep "参数"
在grep命令中输入字符串参数时，最好将其用双引号括起来。例如："mystring"。这样做
有两个原因，一是以防被误解为shell命令，二是可以用来查找多个单词组成的字符串，例如：
"jet plane"，如果不用双引号将其括起来，那么单词plane将被误认为是一个文件，查询结果 将返回"文件不存在"的错误信息。
在调用变量时，也应该使用双引号，诸如：grep "$MYVAR"文件名，如果不这样，将 没有返回结果。
在调用模式匹配时，应使用单引号。

* 匹配相连行数
grep -A 10 -B 10 pattern content
-A 是匹配行之前的行数，-B 是之后的行数。

  -B, --before-context=NUM  print NUM lines of leading context
  -A, --after-context=NUM   print NUM lines of trailing context
  -C, --context=NUM         print NUM lines of output context