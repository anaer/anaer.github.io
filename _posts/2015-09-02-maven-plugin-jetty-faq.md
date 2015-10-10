---
layout: post
title: "maven jetty 插件常见问题"
description: "maven jetty 插件常见问题"
category:maven
tags: [maven, jetty]
---

#### jetty:run 提示数组下标越界
    在web.xml中 添加配置metadata-complete="true", 禁用jetty的注解扫描.

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         metadata-complete="true"
         version="3.0">
```

#### java.lang.Exception: Timeout scanning annotations
    在启动脚本中添加参数 -Dorg.eclipse.jetty.annotations.maxWait=120
