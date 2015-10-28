---
layout: post
title: "man中文帮助"
description: "man中文帮助"
category: linux
tags: [linux, man]
---

* ubuntu源里面已经包含了中文的man包,可以直接安装:
`sudo apt-get install manpages-zh`

* 修改man默认的语言
`sudo vim /etc/manpath.config`
复制所有包含`/usr/share/man`的行,
将前面一行的内容替换为`/usr/share/man/zh_CN`

这样可以使man默认查询中文的, 当查不到中文的时候, 去查询默认语言的man
保存退出后, man已经可以显示为中文了
