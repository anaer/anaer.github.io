---
layout: post
title: "Java环境变量配置"
file: 2014-09-29-java-env-var.md
update: 2014-09-29 10:46
description: ""
category:Java
tags: [Java]

---

# Java环境变量配置

  ```bash
  export JAVA_HOME=/home/backsv/jdk1.6.0_32
  export JRE_HOME=$JAVA_HOME/jre
  export PATH=$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH
  export CLASSPATH=$CLASSPATH:.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib
  ```

