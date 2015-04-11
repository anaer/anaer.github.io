---
layout: post
title: "面试-Java类"
file: 2015-03-29-interview-java-class.md
update: 2015-03-29 20:58
description: "面试-Java类"
category:
tags: [面试]

---

#### 一个".java"源文件是否可以包含多个类(不是内部类)?有什么限制?

    可以有多个类,但只能有一个public的类,并且public的类名必须与文件名相一致.

#### 接口是否可继承接口?抽象类是否可以实现(implements)接口?抽象类是否可以继承具体类(concrete class)？抽象类中是否可以有静态的main方法?
    接口可以继承接口.
    抽象类可以实现(implements)接口.
    抽象类可以继承具体类.
    抽象类中可以有静态的main方法.

#### abstract class和interface有什么区别？
    含有abstract修饰符的class即为抽象类,
    abstract类不能创建实例对象。
    含有abstract方法的类必须定义为abstract class,
    abstract class类中的方法不必是抽象类.
    abstract class类中定义抽象方法必须在具体子类中实现,
    所以, 不能有抽象构造方法或抽象静态方法.如果子类没有实现抽象父类中的所有抽象方法,那么子类也必须定义为abstract类型.

#### 写clone()方法时,通常都有一行代码,是什么？
    clone有缺省行为,
    super.clone();
    因为首先要把父类中的成员复制到位,然后才是复制自己的成员.
