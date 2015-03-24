---
layout: post
title: "Shell文件抬头添加日期"
file: 2015-03-24-shell-adddate.md
update: 2015-03-24 21:54
description: "Shell文件抬头添加日期"
category:Shell
tags: [Shell]

---

```sh
#!/usr/bin/sh
# 用法:
# adddate.sh README.MD
# 在README.MD文件头部添加两行，一行日期，一行分隔符
# 主要为了写备注用的
date >> tmp; echo ==== >> tmp; echo >> tmp; cat $1 >> tmp; cat tmp > $1 ; rm tmp;
```
