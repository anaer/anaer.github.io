---
layout: post
title: "Java BigDecimal"
file: 2014-09-12-java-bigdecimal.md
update: 2014-09-12 17:24
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


# 参考
  * [Non-terminating decimal expansion; no exact representable decimal result ](http://blog.csdn.net/lopper/article/details/5314686)
