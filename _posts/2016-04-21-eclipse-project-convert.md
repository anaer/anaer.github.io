---
layout: post
title: "eclipse工程转换"
description: ""
category: eclipse
tags: [eclipse]
---

1. Maven->eclipse
mvn eclipse:eclipse

2. eclipse->maven
安装好maven插件后，在eclipse工程右键项目：转换为maven工程即可。

3. gradle->eclipse
编辑build.gradle文件，在文件最前面增加一行：
apply plugin: 'eclipse'
gradle eclipse

4. eclipse->gradle
使用eclipse的gradle插件转换.

5. maven->gradle
maven工程目录下执行:
gradle setupBuild