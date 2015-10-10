---
layout: post
title: "Linux的awk内置函数"
description: "Linux的awk内置函数"
category: Linux
tags: [Linux]
---

#### awk内置字符串函数

```
gsub(r,s)       在整个$0中用s替代r
gsub(r,s,t)     在整个t中用s替代r
index(s,t)      返回s中字符串t的第一位置
length(s)       返回s长度
match(s,r)      测试s是否包含匹配r的字符串
split(s,a,fs)   在fs上将s分成序列a
sprint(fmt,exp) 返回经fmt格式化后的exp
sub(r,s)        用$0中最左边最长的子串代替s
substr(s,p)     返回字符串s中从p开始的后缀部分
substr(s,p,n)   返回字符串s中从p开始长度为n的后缀部分
```
