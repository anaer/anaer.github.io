---
layout: post
title: "linux下文件查找内容检索"
description: "文件搜索"
category: linux
tags: [find]
---

* 查找检索

```
1. 查询jpg图片并列表展示
find . -name "*.jpg" -exec ls -rtl {} \;

2. 根据名称查找/目录下的filename.txt文件。
find / -name filename.txt

3. 递归查找所有的xml文件
find . -name "*.xml"

4. 递归查找所有文件内容中包含hello world的xml文件
find . -name "*.xml" |xargs grep "hello world"

5. 查找所以有的包含spring的xml文件
grep -H 'spring' *.xml

6. 删除文件大小为零的文件
find ./ -size 0 | xargs rm -f &

7. 查找当前目录中的所有jar文件
ls -l | grep '.jar'

8. 显示所有以d开头的文件中包含test的行。
grep 'test' d*

9. 显示在aa，bb，cc文件中匹配test的行。
grep 'test' aa bb cc

10. 显示所有包含每个字符串至少有5个连续小写字符的字符串的行。
grep '[a-z]\{5\}' aa
```
