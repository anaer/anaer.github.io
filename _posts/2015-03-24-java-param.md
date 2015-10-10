---
layout: post
title: "java 动态参数"
description: ""
category: Java
tags: [Java]
---

#### Java  动态参数

```java
public int add(int... list) {
    int sum = 0;
    for (int item : list) {
        sum += item;
    }
    return sum;
}
```
