---
layout: post
title: "String、StringBuffer、StringBuilder的区别"
description: ""
category: Java
tags: [Java]
---

# String、StringBuffer、StringBuilder的区别 
  String的值是不可变的，这就导致每次对String的操作都会生成新的String对象，不仅效率低下，而且大量浪费有限的内存空间。
  StringBuffer是可变类，和线程安全的字符串操作类，任何对它指向的字符串的操作都不会产生新的对象。
	每个StringBuffer对象都有一定的缓冲区容量，当字符串大小没有超过容量时，不会分配新的容量，当字符串大小超过容量时，会自动增加容量。 
  StringBuilder和StringBuffer类功能基本相似，
  主要区别在于StringBuffer类的方法是多线程、安全的，
  而StringBuilder不是线程安全的，
  相比而言，StringBuilder类会略微快一点。
  对于经常要改变值的字符串应该使用StringBuffer和StringBuilder类。 
  一般情况下,速度从快到慢:StringBuilder>StringBuffer>String,这种比较是相对的，不是绝对的。

  总结：
  1) 如果要操作少量的数据用String
  2) 单线程操作字符串缓冲区下操作大量数据用StringBuilder
  3) 多线程操作字符串缓冲区下操作大量数据用StringBuffer

# 参考  
  * []()
