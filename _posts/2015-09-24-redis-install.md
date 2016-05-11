---
layout: post
title: "redis安装部署"
description: "redis安装部署"
category:redis
tags: [redis]
---

* 概述
Redis是一种高级key-value数据库。它跟memcached类似，不过数据可以持久化，而且支持的数据类型很丰富。有字符串，链表，集 合和有序集合。支持在服务器端计算集合的并，交和补集(difference)等，还支持多种排序功能。所以Redis也可以被看成是一个数据结构服务 器。

Redis的所有数据都是保存在内存中，然后不定期的通过异步方式保存到磁盘上(这称为“半持久化模式”)；也可以把每一次数据变化都写入到一个append only file(aof)里面(这称为“全持久化模式”)。

* 安装

```
$ wget http://download.redis.io/releases/redis-3.0.3.tar.gz
$ tar xzf redis-3.0.3.tar.gz
$ cd redis-3.0.3
$ make
```

* Redis可执行程序说明
redis-server     Redis服务器的daemon启动程序
redis-cli        Redis命令行操作工具
redis-benchmark  Redis性能测试工具, 测试Redis在当前系统下的读写性能.
redis-check-aof  日志文件检测工具(比如断电造成日志损坏,可以检测并修复)
redis-check-dump 检查导出工具

* 启动redis

```
$ src/redis-server redis.conf &
```

* 检查是否启动成功
a) ps -ef|grep redis|grep -v grep
b) redis-cli [-h localhost -p 6379 ]
```
127.0.0.1:6379> keys *
(empty list or set)
127.0.0.1:6379> set name abc
OK
127.0.0.1:6379> keys *
1) "name"
127.0.0.1:6379> get name
"abc"
```

* 部署Redis为Windows服务
```
redis-server --service-install redis.windows.conf
```
