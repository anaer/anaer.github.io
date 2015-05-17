---
layout: post
title: "java junit"
description: ""
category: java
tags: [java]
---

#### Junit4 常用注解及 Before,After的使用

    JUnit4使用Java5中的注解（annotation），以下是JUnit4常用的几个annotation： 
    @Before：初始化方法 
    @After：释放资源 
    @Test：测试方法，在这里可以测试期望异常和超时时间 
    @Test(expected=ArithmeticException.class)检查被测方法是否抛出ArithmeticException异常 
    @Ignore：忽略的测试方法 
    @BeforeClass：针对所有测试，只执行一次，且必须为static void 
    @AfterClass：针对所有测试，只执行一次，且必须为static void 

    一个JUnit4的单元测试用例执行顺序为： 
    @BeforeClass -> @Before -> @Test -> @After -> @AfterClass; 

    每一个测试方法的调用顺序为： 
    @Before -> @Test -> @After;
 
#### Before 与 After 的使用：
    先了解下何谓 Fixture ？
    它是指在执行一个或者多个测试方法时需要的一系列公共资源或者数据，例如测试环境，测试数据等等。在编写单元测试的过程中，您会发现在大部分的测试方法在进行真正的测试之前都需要做大量的铺垫——为设计准备 Fixture 而忙碌。这些铺垫过程占据的代码往往比真正测试的代码多得多，而且这个比率随着测试的复杂程度的增加而递增。当多个测试方法都需要做同样的铺垫时，重复代码的“坏味道”便在测试代码中弥漫开来。这股“坏味道”会弄脏您的代码，还会因为疏忽造成错误，应该使用一些手段来根除它。
    JUnit 专门提供了设置公共 Fixture 的方法，同一测试类中的所有测试方法都可以共用它来初始化 Fixture 和注销 Fixture。和编写 JUnit 测试方法一样，公共 Fixture 的设置也很简单，您只需要：
    使用注解 org,junit.Before 修饰用于初始化 Fixture 的方法。 使用注解 org.junit.After 修饰用于注销 Fixture 的方法。 保证这两种方法都使用 public void 修饰，而且不能带有任何参数。
    
    // 初始化 Fixture 方法
    @Before public void init(){ …… } 

    // 注销 Fixture 方法
    @After public void destroy(){ …… } 

实例：

```java
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import com.test.io.ReadRemoteTxt;
public class TestReadRemoteTxt
{
 ReadRemoteTxt rr = new ReadRemoteTxt();
 //公用部分
 @Before public void init()
 {  
  rr.connect("http://www.xxx.com/agentProductList.txt");
 }
 @Test
 public void testGetAllProducts()
 {   
  List res = rr.getAllProducts();
  System.out.println(res.size());
 }
 @Test
 public void testGetSomeProducts()
 {   
  List res = rr.getSomeProducts();
  System.out.println(res.size());
 }

}
```