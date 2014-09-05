---
layout: post
title: "Java反射"
description: ""
category: Java
tags: [Java, 反射, reflect]
file: java-reflect.md
update: 2014-09-05 15:49
date: 2014-09-05 14:40
---

#Java反射概念
Java的反射非常强大，传递class， 可以动态的生成该类、取得这个类的所有信息，包括里面的属性、方法以及构造函数等，甚至可以取得其父类或父接口里面的内容。

Java 反射机制主要提供了以下功能：

    在运行时判断任意一个对象所属的类;
    在运行时构造任意一个类的对象;
    在运行时判断任意一个类所具有的成员变量和方法;
    在运行时调用任意一个对象的方法;
    生成动态代理。

在 JDK 中，主要由以下类来实现Java 反射机制，这些类都位于java.lang.reflect包中。

    Class类：代表一个类。
    Field类：代表类的成员变量(成员变量也称为类的属性)。
    Method类：代表类的方法。
    Constructor 类：代表类的构造方法。
    Array类：提供了动态创建数组，以及访问数组元素的静态方法。

```Java
 /**
     * 反射测试
     * @throws ClassNotFoundException
     */
    @Test
    public void test1() throws ClassNotFoundException {
	String str1 = "abc";
	Class cls1 = str1.getClass();
	Class cls2 = String.class;
	Class cls3 = Class.forName("java.lang.String");
	System.out.println(cls1 == cls2);
	System.out.println(cls1 == cls3);
    }

    /**
     * Class方法测试
     * boolean isPrimitive()用来判断指定的Class类是否为一个基本类型。
     * boolean isArray()用来判断指定的Class类是否为一个数组类型。
     */
    @Test
    public void test2() {

	System.out.println(String.class.isPrimitive());
	System.out.println(int.class.isPrimitive());
	System.out.println(int.class == Integer.class);
	System.out.println(int.class == Integer.TYPE);
	System.out.println(int[].class.isPrimitive());
	System.out.println(int[].class.isArray());
    }

    /**
     * 反射构造
     * @throws SecurityException
     * @throws NoSuchMethodException
     * @throws InvocationTargetException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws InstantiationException
     */
    @Test
    public void test3() throws NoSuchMethodException, SecurityException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
	Constructor constructor1 = String.class.getConstructor(StringBuffer.class);
	String str2 = (String) constructor1.newInstance(new StringBuffer("abc"));
	System.out.println(str2.charAt(2));
    }

    @Test
    public void test4() throws NoSuchMethodException, SecurityException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
	Constructor constructor1 = String.class.getConstructor(null);
	String str2 = (String) constructor1.newInstance(null);
	System.out.println("str2:" + str2 + str2.length());
    }
```

# 参考
  * [Java反射](http://www.cnblogs.com/yydcdut/p/3845430.html)
