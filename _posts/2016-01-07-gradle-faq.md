---
layout: post
title: "gradle常见问题"
description: ""
category: gradle
tags: [gradle, faq]
---

* 编译groovy代码时采用 UTF-8

```
tasks.withType(GroovyCompile) {
    groovyOptions.encoding = "MacRoman"
}
```

* 编译JAVA文件时采用UTF-8

```
tasks.withType(Compile) {
    options.encoding = "UTF-8"
}
```
