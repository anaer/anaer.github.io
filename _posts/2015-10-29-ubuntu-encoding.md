---
layout: post
title: "解决Ubuntu中使用windows文件名乱码问题"
description: ""
category: ubuntu
tags: [ubuntu]
---

使ubuntu正常显示GB2312、GBK编码文件 思无涯
ubuntu环境设置的字符集utf8，windows默认字符集是GBK，Ubuntu的默认字符集为utf-8，这使 得在用telnet登录远程服务器或查看windows文件时出现乱码。需要将ubuntu环境设置为GBK或GB2312，或设置软件使其正确显示汉 字。下面以GBK字符集为例进行说明：

一、修改Ubuntu默认字符集为GBK
1、首先设置sudo vi /var/lib/locales/supported.d/local
添加一行 zh_CN.GBK GBK
sudo locale-gen生成locale

2、修改ubuntu的字符集
方法一： 修改用户目录下的.profile文件，增加以下内容：
LANGUAGE="zh_CN:zh:en_US:en"
LANG=zh_CN.GBK
重新登录即可。
这个方法只对该用户有效。
方法二：修改/etc/environment，增加以下内容：
LANGUAGE="zh_CN:zh:en_US:en"
LANG=zh_CN.GBK
然后重启X即可
这个方法对没有设置LANG及LANGUAGE环境变量的用户有效

二、设置软件命名其正常显示GBK
这需要软件本身支持多字符编码，最常见的是IE等浏览器，可以通过设置编码显示GBK字符集。Ubuntu下的一些软件也支持此功能，以ubuntu的终 端程序为例，使其正常显示GBK编码的方法是：在termial窗口上点击菜单：终端->设置字符编码->选择GBK即可。

