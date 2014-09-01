---
layout: post
title: "异常处理 "
description: ""
category: Java
tags: [Java, Spring]
---
# Tomcat启动报错
  * java.lang.ClassNotFoundException: org.springframework.web.servlet.DispatcherServlet.class
  1. 缺少jar包  

  ```xml
  <dependency>
	  <groupId>org.springframework</groupId>
	  <artifactId>spring-webmvc</artifactId>
	  <version>3.0.5.RELEASE</version>
  </dependency>
  ```

  * org.apache.jasper.JasperException: The absolute uri: http://java.sun.com/jsp/jstl/core cannot be resolved in either web.xml or the jar files deployed with this application
  1. 缺少jar包

  ```xml
  <dependency>
	  <groupId>jstl</groupId>
	  <artifactId>jstl</artifactId>
	  <version>1.2</version>
  </dependency>
  ```

  * java.lang.IllegalStateException: Cannot map handler 'com.lzk.controller.ViewController#0' to URL path [/view.form]: There is already handler of type [class com.lzk.controller.ViewController] mapped.
  1. java 代码里使用了注解
    又在配置文件配置了bean

  * Unsupported major.minor version 52.0 (unable to load class com.hqhop.framework.common.bind.annotation.Repository)
	Eclipse配置Tomcat的JDK版本与项目的JDK版本不一致, 属性设置Tomcat的JDK版本 
	[unsupported major.minor version 解决方法](http://www.blogjava.net/Jay2009/archive/2009/04/23/267108.html)
	[错误：Unsupported major.minor version 51.0（jdk版本错误） ](http://blog.csdn.net/witsmakemen/article/details/7832617)

# Eclipse警告信息
* cvc-complex-type.2.4.c: The matching wildcard is strict, but no declaration can be found for element 'mvc:interceptors'.
  1. Preferences->XML->XML Catalog 添加
  http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd
  http://www.springframework.org/schema/mvc/spring-mvc.xsd
  xsd文件下载保存本地

