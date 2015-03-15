---
layout: post
title: "cxf创建webservice"
file: 2014-09-17-webservice.md
update: 2015-03-14 22:23
description: ""
category: Java
tags: [Java, WebService]

---

### Webservice技术

#### Java的Webservice

  * Axis2
  * Spring WS 
  * Jaxws 适合几乎所有Webservice客户端的调用

#### JAX-WS 概述

    JAX-WS2.0 的全称为 Java API for XML-Based Webservices (JAX-WS) 2.0。
    JAX-WS 2.0 是对 JAX-RPC 1.0 规范的扩展，是 JAX-RPC 1.1 的后续版本， JAX-RPC 2.0 标准发布不久后便被重新命名为 JAX-WS 2.0。 
    JAX-WS 2.0 是面向 Java 5 的开发 Web services 的最新编程标准，它提供了新的编程模型和对以往的 JAX-RPC 方式的 Web services 进行了增强。 
    JAX-WS2.0 (JSR 224)是Sun新的web services协议栈，是一个完全基于标准的实现。
    在binding层，使用的是the Java Architecture for XMLBinding (JAXB, JSR 222)，
    在parsing层，使用的是the Streaming API for XML (StAX, JSR 173)，
    同时它还完全支持schema规范。

#### JAX-WS 2.1特性
  
  * 支持SOAP 1.1（默认）、1.2
  * 支持XML/HTTP Binding
  * 支持WS-Addressing
  * 支持document/literal样式
  * 支持WS-I Basic Profile 1.1
  * 支持消息传输优化机制（Message Transmission Optimization Mechanism，MTOM）

#### JAX-WS 2.0开发过程

  JAX-WS 2.0有两种开发过程:自顶向下和自底向上。
  自顶向下指通过一个WSDL文件来创建Web Service,
  自底向上是从Java类出发创建Web Service.
  两种开发过程最终形成的文件包括:
    1. SEI. 一个SEI对应WSDL中WebService中的一个port,在Java中是一个Java接口.
    2. SEI实现类.
    3. WSDL和XSD文件.

#### JAX-WS 创建WebService

```java
package com.ws;

import javax.jws.WebMethod;
import javax.jws.WebService;

//@WebService告诉JAXWS,此类为WebService
@WebService
public class Hello {
    //@WebMethod告诉JAXWS, 此方法为soap方法, 该方法有两个参数, 一个input的String, 一个output的String
    @WebMethod
    public String say(String name) {
       return ("Hello: "+name);
    }
}
```

#### JAXWS工具

  ```
  JAXWS为我们提供了两个工具:
  1. wsgen
  主要用于Server端通过Java类编译成WebService及相关的wsdl文件
  Usage:wsgen [options] < SEI> 主要选项：
  -d指定生成的class文件的位置。
  -s指定生成的Javasource文件的位置。
  -r指定生成的resources文件的位置。如WSDL、XSD 的位置。
  -wsdl，-servicename，-portname 三个参数指定生成的 WSDL 文件中的 service 和 port 的名称。 注意：这里的SEI是一个 endpoint implementation class，而不是一个接口。必须先写好一个endpoint的实现类，该类中用@WebService声明好WebService，再将它编译成class文件，才能提供给wsgen使用。
  2. wsimport
  主要用于Client端(调用端)通过wsdl编译出调用Server端的Java文件.
  Usage:wsimport [options] <WSDL_URI> 主要选项：
  -d指定生成的 class 文件的位置。
  -s指定生成的 Javasource 文件的位置。
  -wsdllocation指定生成的Java source中@WebService.WSDLLocation和 @WebServiceClient. wsdllocation的值
  ```

### Apache cxf

  cxf是调用的jax-ws为标准的基于spring的webservice框架.

#### Maven配置

  ```xml
		 <!-- 
            <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-api</artifactId>
            <version>${cxf.version}</version>
            </dependency>
            -->
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-frontend-jaxws</artifactId>
            <version>${cxf.version}</version>
        </dependency>
        <!-- 
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-bindings-soap</artifactId>
            <version>${cxf.version}</version>
        </dependency>
        -->
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-transports-http</artifactId>
            <version>${cxf.version}</version>
        </dependency>
         <!-- 
            <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-ws-security</artifactId>
            <version>${cxf.version}</version>
            </dependency>
        -->
  ```
#### 错误信息
  * The security token could not be authenticated or authorized

  * cxf wss4j 令牌验证 为什么 回调是空？ jaxws:server password null  
	
在按照网上的例子进行配置用户名令牌的例子，在server端的回调函数中获取的password 却一直是空，搜索了好半天，才找到（这个是MD5加密的）：

WSPasswordCallback 的passwordType属性和password 属性都为null，你只能获得用户名（identifier），一般这里的逻辑是使用这个用户名到数据库中查询其密码，然后再设置到password 属性，WSS4J 会自动比较客户端传来的值和你设置的这个值。你可能会问为什么这里CXF 不把客户端提交的密码传入让我们在ServerPasswordCallbackHandler 中比较呢？这是因为客户端提交过来的密码在SOAP 消息中已经被加密为MD5 的字符串，如果我们要在回调方法中作比较，那么第一步要做的就是把服务端准备好的密码加密为MD5 字符串，由于MD5 算法参数不同结果也会有差别，另外，这样的工作CXF 替我们完成不是更简单吗？

 

根据上面说的，我获取的password 为null，所以这里就不用自己判断密码了，只要验证用户名后，在设置密码就可以自动验证了，代码如下：

```java
public class ServerPasswordCallback implements CallbackHandler {   
   
     public void handle(Callback[] callbacks) throws IOException,   
              UnsupportedCallbackException {   
          WSPasswordCallback pc = (WSPasswordCallback) callbacks[0];   
          String pw = pc.getPassword();   
          String idf = pc.getIdentifier();   
          System.out.println("password:"+pw);   
          System.out.println("identifier:"+idf); 
          if(idf.endsWith("admin")){
           pc.setPassword("admin");
          }
      }
 }
```

#### soapui 请求

  ```xml
     <soapenv:Header>
 <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
                     <wsse:UsernameToken>
                         <wsse:Username>admin</wsse:Username>
                         <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">admin</wsse:Password>
                     </wsse:UsernameToken>
                 </wsse:Security>
   </soapenv:Header>
  ```

### 参考

  * [CXF 发布WebService - jaxws:endpoint](http://dyccsxg.iteye.com/blog/1905440)
  * [使用 CXF 做 webservice 简单例子](http://www.cnblogs.com/frankliiu-java/articles/1641949.html)
  * [CXF发布WebService (二)加入用户名密码验证](http://cermchen.iteye.com/blog/454483)
  * [java wsdl反向生成源码，并使用CXF实现客户端调用代码 ](http://blog.csdn.net/linwei_1029/article/details/8863424)
  * [cxf wss4j 令牌验证 为什么 回调是空？ jaxws:server password null  ](http://cache.baiducontent.com/c?m=9d78d513d9920bfb4fede53b5a4696315910db326bc0d06468a5925fe5154c30477194cb30226113a2b66b1604b8482cfd804265410434f0db9687109bfdd03f2efb3a292042db1405d36eaccf4732c157c107b6b248bfece735e7ff84ce8f0a0e9f4e443cd3b6d00b1d12ce6cf31336e7a1994a165c1abde63262fa58752882&p=93759a46d7c413f740a9c22d021481&newp=cb7ac54ad5c246b111aac7710f5f86231610db2151d0d21e619dd4&user=baidu&fm=sc&query=cxf+webservice+%C3%DC%C2%EB+%CA%C7%BF%D5&qid=9d3e634100007765&p1=2)
  * [CXF学习笔记(4)-HelloWorld!-安全认证 ](http://blog.csdn.net/crazycoder2010/article/details/6695436)
  * [CXF WebService+Spring 无法注入问题解决方法 ](http://blog.csdn.net/chq1988/article/details/38554339)
  * [架构师修练之道](http://blog.csdn.net/column/details/j2ee-guru.html)
