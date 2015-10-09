---
layout: post
title: "面试-java类型"
description: "面试-java类型"
category:面试
tags: [面试]
---

#### short s1=1;s1=s1+1;有什么错?short s1=1;s1+=1;有什么错?

    short s1=1;s1=s1+1;
    由于s1+1运算时会自动提升表达式的类型,所以结果是int类型,再赋值给short类型s1时,编译器将报告需要强制转换类型的错误.
    short s1=1;s1+=1;
    由于+=是java语言规定的运算符,java编译器会对它进行特殊处理,因此可以正确编译.

#### char型变量中能不能存贮一个中文汉字?为什么?

    char型变量是用来存储Unicode编码的字符的,unicode编码字符集中包含了汉字,所以,char型变量中当然可以存储汉字.
    不过,如果某个特殊的汉字没有被包含在unicode编码字符集中,那么,这个char型变量中就不能存储这个特殊的汉字.
    unicode编码占用两个字节,所以,char类型的变量也是占用两个字节.

#### Integer与int的区别
    int是java提供的8种原始数据类型之一.java为每个原始类型提供了封装类,Integer是java为int提供的封装类.int的默认值是0,而Integer的默认值是null,即Integer可以区分出未赋值和值为0的区别,int则无法表达出未赋值的情况.
