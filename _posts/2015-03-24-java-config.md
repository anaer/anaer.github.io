---
layout: post
title: "Java 配置"
description: "Java 配置"
category:Java
tags: [Java]

---

#### Java环境变量

    Windows:
    JAVA_HOME=C:\Program Files\Java\jdk1.6.0_20
    PATH=.;%JAVA_HOME%\bin;
    CLASSPATH=.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar
    
    Unix:
    export JAVA_HOME=/usr/java1.6
    export CLASSPATH=.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib
    export PATH=$JAVA_HOME/bin:$PATH
        