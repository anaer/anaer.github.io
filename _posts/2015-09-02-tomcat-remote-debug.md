---
layout: post
title: "tomcat 远程调试"
description: "tomcat远程调试"
category:tomcat
tags: [tomcat]
---

1. 设置 tomecat 参数 包括 启动debug模式，远程socket链接和监听端口等。在catalina.bat文件中最前面加入以下参数

```
SET CATALINA_OPTS=-server -Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8000
```

2. 在eclipse配置外部服务器 Remote Java Application

菜单Run->Open debug dialog
在 Remote Java Application 新建一个填入你要调试的项目名称，Host：localhost Port：8000 。并勾选 Allowtermination of remote VM。
