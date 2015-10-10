---
layout: post
title: "spring源码学习-ioc"
description: "spring源码学习-ioc"
category:spring
tags: [spring]
---

#### ioc概念
ioc控制反转
ioc是将对象的创建和依赖关系交给容器.

#### 核心类
* BeanFactory
bean工厂
作用:根据bean的名称或者类型等, 返回一个bean的实例.

一个工厂如果想拥有这样的功能，那么它一定需要以下几个因素：

1. 需要持有各种bean的定义，否则无法正确的完成bean的实例化。

2. 需要持有bean之间的依赖关系，否则在bean实例化的过程中也会出现问题。
例如上例，如果我们只是各自持有Person和Company，却不知道他们的依赖关系，那么在Company初始化以后，调用open方法时，就会报空指针。这是因为Company其实并没有真正的被正确初始化。

3. 以上两种都要依赖于我们所写的依赖关系的定义，
暂且认为是XML文件（其实可以是各种各样的），那么我们需要一个工具来完成XML文件的读取。
只需要满足以上三种条件，便可以创建一个bean工厂，来生产各种bean。
