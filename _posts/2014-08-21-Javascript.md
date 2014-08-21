---
layout: post
title: "Javascript学习笔记"
description: ""
category: Javascript
tags: [Javascript]
---

# 说明  
  * 有些老旧的浏览器可能需要在script中加入type ="text/javascript"，但是现在已经不需要了，现代浏览器以及HTML5都是默认使用Javascript的。
  * 注释

    ```javascript
    // 单行注释
    /*
      多行注释
    */
    ```

  * 和大多数编程语言一样，Javascript也支持变量，而且它是严格区分变量名的大小写的。
  * Javascript的变量名必须以字母开头，后面跟字母数字或者下划线，可能PHP或者Perl的用户喜欢用$开头，我们Javascript中也可以这么做，但是不推荐。
  * Javascript的变量类型主要是Number、String、Null、Undefined、Boolean、Object这六种，而且它是一种弱类型编程语言，即我们在定义变量的时候不需要指定其类型。  
  * 变量的赋值也是和大多数编程语言一样，使用=号赋值的
  * Javascript中的运算符也和其他编程语言非常类似，支持常见的=用于赋值、+用于相加，*用于乘法、/用于除法，%用于取模。  
  * 此外Javascript还支持++和--这两个自增和自减运算符。
  * 还有包括+=、-=、*=、/=、%=这些运算符也和其他绝大多数语言都是一样的，比如x+=y表示x = x+y。  
  * 字符串也可以用+号进行连接，这点很多语言也都支持，很自然的表达习惯。  
  * 如果是一个数字和一个字符串用+做运算，则返回的是一个字符串。  
  * 用==表示等于，===表示不仅数值相等而且类型也需要相同，！=表示不等于，<=表示小于等于，>=表示大于等于，<表示小于，>表示大于，此外，!==表示绝对不等于，即值不相等并且类型也不相同。  
  * Javascript还支持三目运算符  

---

# 参考

  * [辛星解读Javascript](http://blog.csdn.net/column/details/xinxingjs.html)  
