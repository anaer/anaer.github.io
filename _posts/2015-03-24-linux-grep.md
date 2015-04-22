---
layout: post
title: "linux grep命令"
file: file
update: 22 Apr 2015
description: ""
category: category
tags: [tag]
--- 

在g r e p命令中输入字符串参数时，最好将其用双引号括起来。例如：“m y s t r i n g”。这样做
有两个原因，一是以防被误解为s h e l l命令，二是可以用来查找多个单词组成的字符串，例如：
“jet plane”，如果不用双引号将其括起来，那么单词p l a n e将被误认为是一个文件，查询结果
将返回“文件不存在”的错误信息。
在调用变量时，也应该使用双引号，诸如： g r e p“$ M Y VA R”文件名，如果不这样，将
没有返回结果。
在调用模式匹配时，应使用单引号。
