---
layout: post
title: "memcached使用介绍"
file: 2015-02-12-memcached.md
update: 2015-03-04 09:33
description: "memcached使用介绍"
category: memcached
tags: [memcached]

---

#### 安装启动
        
    安装
    memcached.exe -d install
    启动
    memcached.exe -d start

#### 连接memcached
    
    telnet 127.0.0.1 11211

    常用命令:
    set
    add
    replace
    get
    delete


### 参考
  * [win7 安装 memcached](http://www.cnblogs.com/jiajinyi/p/3531381.html)
  * [memcached命令行参数说明](http://blog.csdn.net/zzulp/article/details/7823511)
