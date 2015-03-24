---
layout: post
title: "Java堆栈"
file: 2015-03-24-java-stack&heap.md
update: 2015-03-24 11:07
description: ""
category:
tags: []

---

#### java 堆栈
  Java 内存模式里面，有Heap跟Stack之分。所有经过 new 生成的对象，都应该放在heap 里面，当heap空间 不够时，有OutOfMemoryException；
  Stack主要存放基本类型， static 字段，方法，对象的引用地址。Stack不需要GC。
