---
layout: post
title: "tomcat faq"
description: "tomcat faq"
category: java
tags: [tomcat]

---

### Tomcat 启动问题

#### [WARNING] Unable to process class com/ibm/icu/impl/data/LocaleElements_zh__PINYIN.class in JarAnalyzer File icu4j-2.6.1.jar  Invalid byte tag in constant pool: 60
    pom.xml中过滤icu4j
    <exclusion>
      <artifactId>icu4j</artifactId>
      <groupId>com.ibm.icu</groupId>
    </exclusion>

#### The Apache Tomcat Native library which allows optimal performance in production environments was not found ……
    下载tcnative-1.dll文件放到path目录下, 有32位/64位 不同会报错

#### 解决SSL证书PKIX问题
[解决SSL证书PKIX问题](http://my.oschina.net/topeagle/blog/416139)

#### java.lang.IllegalStateException: BeanFactory not initialized or already closed - call 'refresh' before accessing beans via the ApplicationContext
    重新编译

#### JRebel-SDK-CBP: ERROR Class 'org.apache.ibatis.reflection.Reflector' could not be processed by org.zeroturnaround.jrebel.mybatis.cbp.ReflectorCBP@org.apache.catalina.loader.WebappClassLoader@60f017: org.zeroturnaround.bundled.javassist.NotFoundException: forClass(..) is not found in org.apache.ibatis.reflection.Reflector
    mybatis要用3.2.7, 3.3.0版本中Reflector类缺少forClass方法

#### WARN CacheConfiguration - Cache 'Cache1' is set to eternal but also has TTI/TTL set.  To avoid this warning, clean up the config removing conflicting values of eternal, TTI and TTL. Effective configuration for Cache 'Cache1' will be eternal='true', timeToIdleSeconds='0', timeToLiveSeconds='0'.
    可以不管，或者修改ehcache.xml中配置

    
#### java.lang.ClassNotFoundException: org.springframework.web.servlet.DispatcherServlet.class
  1. 缺少jar包  

  ```xml
  <dependency>
	  <groupId>org.springframework</groupId>
	  <artifactId>spring-webmvc</artifactId>
	  <version>3.0.5.RELEASE</version>
  </dependency>
  ```

#### org.apache.jasper.JasperException: The absolute uri: http://java.sun.com/jsp/jstl/core cannot be resolved in either web.xml or the jar files deployed with this application
  1. 缺少jar包

  ```xml
  <dependency>
	  <groupId>jstl</groupId>
	  <artifactId>jstl</artifactId>
	  <version>1.2</version>
  </dependency>
  ```

#### java.lang.IllegalStateException: Cannot map handler 'com.lzk.controller.ViewController#0' to URL path [/view.form]: There is already handler of type [class com.lzk.controller.ViewController] mapped.
  1. java 代码里使用了注解
    又在配置文件配置了bean

#### Unsupported major.minor version 52.0 (unable to load class com.hqhop.framework.common.bind.annotation.Repository)
	Eclipse配置Tomcat的JDK版本与项目的JDK版本不一致, 属性设置Tomcat的JDK版本 
	[unsupported major.minor version 解决方法](http://www.blogjava.net/Jay2009/archive/2009/04/23/267108.html)
	[错误：Unsupported major.minor version 51.0（jdk版本错误） ](http://blog.csdn.net/witsmakemen/article/details/7832617)

#### WARN UUIDHexGenerator:59 - HHH000409: Using org.hibernate.id.UUIDHexGenerator which does not generate IETF RFC 4122 compliant UUID values; consider using org.hibernate.id.UUIDGenerator instead
	[Using org.hibernate.id.UUIDHexGenerator的解决方案](http://lvjava.com/?p=370)
	
