---
layout: post
title: "Java环境变量配置"
description: "java 环境变量配置"
category:Java
tags: [Java]
---

#### Java环境变量配置

    Windows:
    JAVA_HOME=C:\Program Files\Java\jdk1.6.0_20
    PATH=.;%JAVA_HOME%\bin;
    CLASSPATH=.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar

    Unix:
    export JAVA_HOME=/usr/java1.6
    export CLASSPATH=.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib
    export PATH=$JAVA_HOME/bin:$PATH

#### jdk 下载地址

* [jdk8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* [jdk9](https://jdk9.java.net/download/)
* [Java内存溢出详解 ](http://blog.csdn.net/u013628152/article/details/42539553)
