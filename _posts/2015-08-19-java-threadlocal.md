---
layout: post
title: "Threadlocal线程局部变量"
description: "Threadlocal线程局部变量"
category:Java
tags: [Threadlocal]

---

#### ThreadLocal
ThreadLocal是为解决多线程程序的并发问题而提出的，可以称之为线程局部变量。与一般的变量的区别在于，生命周期是在线程范围内的。
static变量是的生命周期与类的使用周期相同，即只要类存在，那么static变量也就存在.
static的ThreadLocal变量是一个与线程相关的静态变量，即一个线程内，static变量是被各个实例共同引用的，但是不同线程内，static变量是隔开的

