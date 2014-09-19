---
layout: post
title: "cxf创建webservice"
file: 2014-09-17-java-cxf-webservice.md
update: 2014-09-19 14:59
description: ""
category: Java
tags: [Java, WebService]

---
# Maven配置

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
# 错误信息
  * The security token could not be authenticated or authorized

  * cxf wss4j 令牌验证 为什么 回调是空？ jaxws:server password null  
	
在按照网上的例子进行配置用户名令牌的例子，在server端的回调函数中获取的password 却一直是空，搜索了好半天，才找到（这个是MD5加密的）：

WSPasswordCallback 的passwordType属性和password 属性都为null，你只能获得用户名（identifier），一般这里的逻辑是使用这个用户名到数据库中查询其密码，然后再设置到password 属性，WSS4J 会自动比较客户端传来的值和你设置的这个值。你可能会问为什么这里CXF 不把客户端提交的密码传入让我们在ServerPasswordCallbackHandler 中比较呢？这是因为客户端提交过来的密码在SOAP 消息中已经被加密为MD5 的字符串，如果我们要在回调方法中作比较，那么第一步要做的就是把服务端准备好的密码加密为MD5 字符串，由于MD5 算法参数不同结果也会有差别，另外，这样的工作CXF 替我们完成不是更简单吗？

 

根据上面说的，我获取的password 为null，所以这里就不用自己判断密码了，只要验证用户名后，在设置密码就可以自动验证了，代码如下：

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
  

# soapui 请求

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

# 参考

  * [CXF 发布WebService - jaxws:endpoint](http://dyccsxg.iteye.com/blog/1905440)
  * [使用 CXF 做 webservice 简单例子](http://www.cnblogs.com/frankliiu-java/articles/1641949.html)
  * [CXF发布WebService (二)加入用户名密码验证](http://cermchen.iteye.com/blog/454483)
  * [java wsdl反向生成源码，并使用CXF实现客户端调用代码 ](http://blog.csdn.net/linwei_1029/article/details/8863424)
  * [cxf wss4j 令牌验证 为什么 回调是空？ jaxws:server password null  ](http://cache.baiducontent.com/c?m=9d78d513d9920bfb4fede53b5a4696315910db326bc0d06468a5925fe5154c30477194cb30226113a2b66b1604b8482cfd804265410434f0db9687109bfdd03f2efb3a292042db1405d36eaccf4732c157c107b6b248bfece735e7ff84ce8f0a0e9f4e443cd3b6d00b1d12ce6cf31336e7a1994a165c1abde63262fa58752882&p=93759a46d7c413f740a9c22d021481&newp=cb7ac54ad5c246b111aac7710f5f86231610db2151d0d21e619dd4&user=baidu&fm=sc&query=cxf+webservice+%C3%DC%C2%EB+%CA%C7%BF%D5&qid=9d3e634100007765&p1=2)
  * [CXF学习笔记(4)-HelloWorld!-安全认证 ](http://blog.csdn.net/crazycoder2010/article/details/6695436)
