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