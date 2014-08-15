---
layout: post
title: "异常处理 "
description: ""
category: Java
tags: [Java, Spring]
---
## Java
### Tomcat 启动报错:java.lang.ClassNotFoundException: org.springframework.web.servlet.DispatcherServlet.class
1. 缺少jar包  
```xml
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>3.0.5.RELEASE</version>
		</dependency>
```

### org.apache.jasper.JasperException: The absolute uri: http://java.sun.com/jsp/jstl/core cannot be resolved in either web.xml or the jar files deployed with this application
1. 缺少jar包
```xml
<dependency>
			<groupId>jstl</groupId>
			<artifactId>jstl</artifactId>
			<version>1.2</version>
		</dependency>
```

###  java.lang.IllegalStateException: Cannot map handler 'com.lzk.controller.ViewController#0' to URL path [/view.form]: There is already handler of type [class com.lzk.controller.ViewController] mapped.
1. java 代码里使用了注解
    又在配置文件配置了bean

### cvc-complex-type.2.4.c: The matching wildcard is strict, but no declaration can be found for element 'mvc:interceptors'.
1. Preferences->XML->XML Catalog 添加
	http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd
	http://www.springframework.org/schema/mvc/spring-mvc.xsd
	xsd文件下载保存本地

### java.lang.ClassNotFoundException: org.springframework.web.util.Log4jConfigListener
