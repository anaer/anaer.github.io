---
layout: post
title: "mybatis 标签"
description: "mybatis标签"
category:Java
tags: [mybatis]
---

### 动态sql元素
    if
    choose（when，otherwise）
    trim
    where
    set
    foreach
    bind

#### foreach
```xml
<if test="multiName !=null and multiName.size()!=0">
    and name in
    <foreach collection="multiName" item="item"
        index="index" open="(" close=")" separator=",">
        #{item}
    </foreach>
</if>
```

### 参考
* [动态sql](http://mybatis.github.io/mybatis-3/zh/dynamic-sql.html)
* [MyBatis的动态SQL详解](http://haohaoxuexi.iteye.com/blog/1338557)
* [Mybatis的参数使用 ](http://blog.csdn.net/swingline/article/details/8944380)
