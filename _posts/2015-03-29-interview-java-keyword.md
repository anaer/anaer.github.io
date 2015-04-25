---
layout: post
title: "面试-Java关键字"
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

#### 是否可以从一个static方法内部发出对非static方法的引用?
    不可以.因为非static方法是要与对象关联在一起的,必须创建一个对象后,才可以在该对象上进行方法调用,而static方法调用时不需要创建对象,可以直接调用.也就是说,当一个static方法被调用时,可能还没有创建任何实例对象.

#### 请说出作用域public,private,protected,以及不写时的区别
    如果在修饰的元素上面没有写任何访问修饰符,则表示friendly.
    作用域     当前类,同一包,子孙类,其他包
    public 4
    protected 3
    friendly 2
    private 1

#### Overload和Override的区别.Overload的方法是否可以改变返回值的类型?
    Overload:重载,表示同一类中可以有多个名称相同的方法,但这些方法的参数列表各不相同(即参数个数或类型不同).
    Override:重写,表示子类中的方法可以与父类中的某个方法的名称和参数完全相同,通过子类创建的实例对象调用这个方法时,将调用子类中的定义方法,这相当于把父类中定义的那个完全相同的方法给覆盖了,这也是面向对象编程的多态性的一种表现.

#### 构造器Constructor是否可以被override?
    构造器Constructor不能被继承,因此不能重写override,但可以被重载overload.


