---
layout: post
title: "面试-Java关键字"
file: 2015-03-29-interview-java-keyword.md
update: 2015-03-29 21:22
description: "面试-Java关键字"
category:面试
tags: [面试]

---

#### Java有没有goto?

    java中的保留字,现在没有在java中使用.

#### 在java中如何跳出当前的多重嵌套循环?

    1. 使用break label
    在java中,要想跳出多重循环,可以在外面的循环语句前定义一个标号,然后在里层循环体的代码中使用带有标号的break羽钜,即可跳出外层循环.例如,
    ok:
    for(int i=0; i<10; i++){
      for(int j=0; j<10; j++){
        System.out.println("i="+i+",j="+j);
        if(j==5) break ok;
      }
    }

    2. 通过满足条件break
    让外层的循环条件表达式的结果可以受到里层循环体代码的控制,
    例如,要在二维数组中查找到某个数字.
    int arr[][]={{1,2,3},{4,5,6,7},{9}};
    boolean found = false;
    for(int i=0; i<arr.length&&!found;i++){
      for(int j=0; j<arr[i].length; j++){
        System.out.println("i="+i+",j="+j);
        if(arr[i][j]==5){
          found=true;
          break;
        }
      }
    }

#### switch语句能否作用在byte上,能否作用在long上,能否作用在String上?

    在switch(expr1)中,expr1只能是一个整数表达式或者枚举常量,整数表达式可以是int基本类型或Integer包装类型,由于,byte,short,char都可以隐含转换为int,所以,这些类型以及这些类型的包装类型也是可以的.显然,long不能被隐式转换为int类型,所以,不能作用于switch语句中.
    由于在JDK7.0中引入新特性,所以switch语句可以接收一个String类型的值.
    所以switch语句可以作用于byte,short,char,int,enum,String(JDK7.0+)

#### 使用final关键字修饰一个变量时,是引用不能变,还是引用的对象不能变?

    使用final关键字修饰一个变量时,是指引用变量不能变,引用变量所指向的对象中的内容还是可以改变的.
    例如,对于如下语句:
    final StringBuffer a = new StringBuffer("immutable");
    执行如下语句将报告编译期错误:
    a = new StringBuffer("");
    但是,执行如下语句则可以通过编译:
    a.append("broken!");

    有人在定义方法的参数时,可能想采用如下形式来阻止方法内部修改传进来的参数对象:
    public void method(final StringBuffer param){}
    实际上,这是办不到的,在该方法内部仍然可以增加如下代码来修改参数对象:
    param.append("a");

