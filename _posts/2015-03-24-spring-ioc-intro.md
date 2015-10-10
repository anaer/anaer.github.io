---
layout: post
title: "Spring Ioc介绍"
description: "Spring Ioc介绍"
category:Spring
tags: [Spring, Ioc]
---

#### Spring IOC
    控制反转 依赖注入 指的同一回事，A类需要使用B类时，通过IOC来实例化
    方式：
    1、接口注入
    2、setter 注入
    3、构造器注入

#### 对于普通ioc容器启动到被客户端使用的步骤大致如下:
定义->定位->装载->注册->创建->注入
