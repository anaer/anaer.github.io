---
layout: post
title: "ehcache缓存"
description: "ehcache缓存"
category: ehcache
tags: [ehcache]
---

### mybatis整合ehcache

#### 添加jar包依赖

```xml
<dependency>
    <groupId>org.mybatis.caches</groupId>
    <artifactId>mybatis-ehcache</artifactId>
    <version>1.0.3</version>
</dependency>
```

#### mapper启动cache
    在mapper中添加cache配置

```xml
    <!-- 以下两个<cache>标签二选一,第一个可以输出日志,第二个不输出日志 -->
    <cache type="org.mybatis.caches.ehcache.LoggingEhcache" />
    <cache type="org.mybatis.caches.ehcache.EhcacheCache"/>
```

#### cache配置
  1. classpath目录下添加ehcache.xml配置文件
  2. 在cache标签中 添加属性配置

### 参考
  * [Java缓存框架使用EhCache结合Spring AOP](http://www.open-open.com/lib/view/open1344438054796.html)
  * [Mybatis与Ehcache整合](http://blog.csdn.net/rishengcsdn/article/details/39993387)
