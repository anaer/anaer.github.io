---
layout: post
title: "Tomcat FAQ"
file: 2014-12-05-tomcat.md
update: 2014-12-05 09:51
description: "Tomcat FAQ"
category: Java
tags: [Tomcat]

---

### Tomcat 启动问题
  * [WARNING] Unable to process class com/ibm/icu/impl/data/LocaleElements_zh__PINYIN.class in JarAnalyzer File icu4j-2.6.1.jar
  Invalid byte tag in constant pool: 60
  
    pom.xml中过滤icu4j
    <exclusion>
      <artifactId>icu4j</artifactId>
      <groupId>com.ibm.icu</groupId>
    </exclusion>
  
