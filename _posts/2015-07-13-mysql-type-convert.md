---
layout: post
title: "mysql类型转换"
description: "mysql类型转换"
category:mysql
tags: [mysql]
---

#### 字符串转日期
下面将讲述如何在MYSQL中把一个字符串转换成日期：
背景：rq字段信息为：20100901
1、无需转换的：
SELECT * FROM tairlist_day WHERE rq>'2010-07-31' AND rq<'2010-09-01'
2、使用：DATE_FORMAT
SELECT * FROM tairlist_day WHERE DATE_FORMAT( rq, '%Y-%m-%d')>'2010-08-01' AND DATE_FORMAT( rq, '%Y-%m-%d')<'2010-08-03'
其中第1要在一个“宽松”的语法是被允许的：以任何标点符号作为日期部分和时间部分中的定界符，如：
一个 YYYYMMDD 或 YYMMDD 格式的数字，只要数字看起来像是一个日期。例如，19830905 和 830905 被解释成为 '1983-09-05 '。
建议使用第2种

#### 日期转字符串
```
mysql> select date_format(now(),'%Y');
+-------------------------+
| date_format(now(),'%Y') |
+-------------------------+
| 2009                    |
+-------------------------+
1 row in set (0.00 sec)

扩展：

%Y：年
%c：月
%d：日
%H：小时
%i：分钟
%s：秒

mysql> select date_format(now(),'%Y-%c-%d %h:%i:%s');
+----------------------------------------+
| date_format(now(),'%Y-%c-%d %h:%i:%s') |
+----------------------------------------+
| 2009-8-07 06:59:40                     |
+----------------------------------------+
1 row in set (0.00 sec)
```
