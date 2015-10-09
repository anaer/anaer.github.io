---
layout: post
title: "Java BigDecimal"
description: ""
category: Java
tags: [Java]
---

由于需要处理精度比较高的浮点数，所以弃用double类型，改用BigDecimal类来进行数值处理。

在加减乘时都没有出现问题，但是到除法运算时，提示了如下错误：

大概的意思是“无法结束的除法表达式；没有精确的除结果”。我当时输入的10/3，结果应该是3.3333....333。



于是在网上找资料，发现我原来的处理方式有问题。

BigDecimal num1 = new BigDecimal("10");

BigDecimal num2 = new BigDecimal("3");

BigDecimal num3 = num1.divide(num2);



其实devide的函数定义如下

BigDecimal.divide(BigDecimal divisor, int scale, RoundingMode roundingMode) ;

scale为小数位数；

roundingMode为小数模式；
ROUND_CEILING
    如果 BigDecimal 是正的，则做 ROUND_UP 操作；如果为负，则做 ROUND_DOWN 操作。
ROUND_DOWN
    从不在舍弃(即截断)的小数之前增加数字。
ROUND_FLOOR
    如果 BigDecimal 为正，则作 ROUND_UP ；如果为负，则作 ROUND_DOWN 。
ROUND_HALF_DOWN
    若舍弃部分> .5，则作 ROUND_UP；否则，作 ROUND_DOWN 。
ROUND_HALF_EVEN
    如果舍弃部分左边的数字为奇数，则作 ROUND_HALF_UP ；如果它为偶数，则作 ROUND_HALF_DOWN 。
ROUND_HALF_UP
    若舍弃部分>=.5，则作 ROUND_UP ；否则，作 ROUND_DOWN 。
ROUND_UNNECESSARY
    该“伪舍入模式”实际是指明所要求的操作必须是精确的，，因此不需要舍入操作。
ROUND_UP
    总是在非 0 舍弃小数(即截断)之前增加数字。

写成如下便可通过

BigDecimal num3 = num1.divide(num2，10，ROUND_HALF_DOWN);

  ```Java
  BigDecimal.setScale()方法用于格式化小数点
  setScale(1)表示保留一位小数，默认用四舍五入方式
  setScale(1,BigDecimal.ROUND_DOWN)直接删除多余的小数位，如2.35会变成2.3
  setScale(1,BigDecimal.ROUND_UP)进位处理，2.35变成2.4
  setScale(1,BigDecimal.ROUND_HALF_UP)四舍五入，2.35变成2.4
  setScaler(1,BigDecimal.ROUND_HALF_DOWN)四舍五入，2.35变成2.3，如果是5则向下舍
  ```

## BigDecimal精度处理

  ```Java
  @Test
  public void test3() {
    BigDecimal a = new BigDecimal(2.134); // 需要使用字符串构造BigDecimal，因为double的精度不准
                                          // 需要使用下面的两种方式
    System.out.println(a); // 2.133999999999999896971303314785473048686981201171875

    BigDecimal b = BigDecimal.valueOf(2.134); // valueOf 效果跟下面的一样
    System.out.println(b); // 2.134

    BigDecimal c = new BigDecimal(String.valueOf(2.134));
    System.out.println(c); // 2.134
  }
  ```

# 参考
  * [Non-terminating decimal expansion; no exact representable decimal result ](http://blog.csdn.net/lopper/article/details/5314686)
