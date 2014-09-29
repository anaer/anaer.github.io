---
layout: post
title: "异常处理 "
file: 2014-08-15-Exception.md
update: 2014-09-27 09:22
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

  * WARN UUIDHexGenerator:59 - HHH000409: Using org.hibernate.id.UUIDHexGenerator which does not generate IETF RFC 4122 compliant UUID values; consider using org.hibernate.id.UUIDGenerator instead
	[Using org.hibernate.id.UUIDHexGenerator的解决方案](http://lvjava.com/?p=370)
	

# Eclipse警告信息
  * cvc-complex-type.2.4.c: The matching wildcard is strict, but no declaration can be found for element 'mvc:interceptors'.
	1. Preferences->XML->XML Catalog 添加
	http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd
	http://www.springframework.org/schema/mvc/spring-mvc.xsd
	xsd文件下载保存本地 存放路径最好不带空格

	```xml
	Entry element:		Public
	Location:			E:\anaer\workspace\xml\mybatis-3-mapper.dtd
	URI:   				file:///E:/anaer/workspace/xml/mybatis-3-mapper.dtd
	Key type:			Public ID
	Key:				-//mybatis.org//DTD Mapper 3.0//EN
	```

	```xml
	Entry element:		URI
	Location:			E:\anaer\workspace\xml\jaxws.xsd
	URI:   				file:///E:/anaer/workspace/xml/jaxws.xsd
	Key type:			Namespace name
	Key:				http://cxf.apache.org/jaxws
	```

	```xml
	Entry element:		URI
	Location:			E:\anaer\workspace\xml\jaxws.xsd
	URI:   				file:///E:/anaer/workspace/xml/jaxws.xsd
	Key type:			Namespace name
	Key:				http://cxf.apache.org/schemas/jaxws.xsd
	```

	```xml
	Entry element:		URI
	Location:			E:\anaer\workspace\xml\spring-mvc-3.0.xsd
	URI:   				file:///E:/anaer/workspace/xml/spring-mvc-3.0.xsd
	Key type:			Namespace name
	Key:				http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd
	```

	```xml
	Entry element:		URI
	Location:			E:\anaer\workspace\xml\spring-mvc.xsd
	URI:   				file:///E:/anaer/workspace/xml/spring-mvc.xsd
	Key type:			Namespace name
	Key:				http://www.springframework.org/schema/mvc/spring-mvc.xsd
	```
  * eclipse 中 js提示 Syntax error on token "Invalid Character", delete this token 
	Preferences->JavaScript->Editor 去掉Report problems as you type
# Mybatis 报错
  * Type interface com.souvi.ibatis.xxxMapper is  not known to the MapperRegistry
	1. 代码未注册

	  ```java
	  factory.getConfiguration().addMapper(UserInfoMapper.class);
	  ```
	2. 配置文件没配置或者没配对 如namespace等

  * org.apache.ibatis.binding.BindingException: Type interface com.mybatis3.mappers.StudentMapper is already known to the MapperRegistry.
	上面那个问题产生的，重复注册

  * Invalid bound statement (not found) 
	1. namespace不对
	2. xml中未定义方法
	3. 返回List,未配置ResultMap

# Log4j报错 
  * java.lang.NoSuchMethodError: org.slf4j.helpers.MessageFormatter.format(Ljava/lang/String;Ljava/lang/Object;)Ljava/lang/String;
	log4j jar包冲突

# cxf
  * Cannot find any registered HttpDestinationFactory from the Bus.
	1. 包冲突 

# git 
git clone https://github.com/anaer/root.git
正克隆到 'root'...
fatal: unable to access 'https://github.com/anaer/root.git/': error setting cert                                                                                                    ificate verify locations:
  CAfile: /usr/ssl/certs/ca-bundle.crt
  CApath: none

  跳过CA验证
  export GIT_SSL_NO_VERIFY=1

#cygwin

* /usr/libexec/git-core/git-remote-https.exe: error while loading shared libraries: ?: cannot open shared object file: No such file or directory
  重新安装libcygkrb5...

* 
curl: (77) error setting certificate verify locations:
  CAfile: /usr/ssl/certs/ca-bundle.crt
  CApath: none

* no acceptable C compiler found in $PATH
  缺少gcc编译器
