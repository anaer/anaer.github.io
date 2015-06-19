---
layout: post
title: "jrebel常见问题处理"
description: "jrebel常见问题处理"
category:jrebel
tags: [jrebel]

---

#### JRebel-SDK-CBP: ERROR Class 'org.apache.ibatis.reflection.Reflector' could not be processed by org.zeroturnaround.jrebel.mybatis.cbp.ReflectorCBP@org.apache.catalina.loader.WebappClassLoader@63e4773c: org.zeroturnaround.bundled.javassist.NotFoundException: forClass(..) is not found in org.apache.ibatis.reflection.Reflector
  使用jrebel 6.0.0 需要使用 mybatis 3.1.1 需要调用Reflector.forClass方法
