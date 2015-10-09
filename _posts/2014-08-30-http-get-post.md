---
layout: post
title: "web Form 表单 get与post区别"
description: ""
category: Java
tags: [Java]
---

#### web Form 表单 get与post区别

```
  get和post方法的不同 在B/S应用程序中，前台与后台的数据交互，都是通过HTML中Form表单完成的。
  Form提供了两种数据传输的方式——get和post。虽然它们都是数据的提交方式，但是在实际传输时确有很大的不同，
  并且可能会对数据产生严重的影响。虽然为了方便的得到变量值，Web容器已经屏蔽了二者的一些差异，
  但是了解二者的差异在以后的编程也会很有帮助的。 Form中的get和post方法，
  在数据传输过程中分别对应了HTTP协议中的GET和POST方法。
  二者主要区别如下：
  1、Get是用来从服务器上获得数据，而Post是用来向服务器上传递数据。
  2、Get将表单中数据的按照variable=value的形式，添加到action所指向的URL后面，并且两者使用“?”连接，
  而各个变量之间使用“&”连接；Post是将表单中的数据放在form的数据体中，按照变量和值相对应的方式，
  传递到action所指向URL。
  3、Get是不安全的，因为在传输过程，数据被放在请求的URL中，而如今现有的很多服务器、
  代理服务器或者用户代理都会将请求URL记录到日志文件中，然后放在某个地方，
  这样就可能会有一些隐私的信息被第三方看到。另外，用户也可以在浏览器上直接看到提交的数据，
  一些系统内部消息将会一同显示在用户面前。Post的所有操作对用户来说都是不可见的。
  4、Get传输的数据量小，这主要是因为受URL长度限制；而Post可以传输大量的数据，
  所以在上传文件只能使用Post（当然还有一个原因，将在后面的提到）。
  5、Get限制Form表单的数据集的值必须为ASCII字符；而Post支持整个ISO10646字符集。
  6、Get是Form的默认方法。
  GET 和 POST 的数据格式都是一样的： GET 支持的最大字节限制是 2048 Bytes POST 支持的最大字节限制是 2GB
```

#### 参数转换

```java

    TreeMap<String, String[]> params = new TreeMap(map);

    String queryString = "";
    for (String key : params.keySet()) {
      String[] values = params.get(key);
      for (String value : values) {
        queryString += key + "=" + value + "&";
      }
    }
    // 去掉最后一个空格
    queryString = queryString.substring(0, queryString.length() - 1);
    System.out.println("POST参数:" + queryString);
```



#### 参考
  * [web Form 表单method="get" method="post" 区别](http://www.cnblogs.com/yzc19838458/p/3946180.html)
  * [get/post发送HTTP请求3](http://www.cnblogs.com/java-pan/archive/2012/05/05/HTTP-POST-byte.html)
  * [java如何得到GET和POST请求URL和参数列表 ](http://blog.csdn.net/yaerfeng/article/details/18942739)
  * [解决get方法传递URL参数中文乱码问题](http://www.cnblogs.com/maxupeng/archive/2010/11/26/1889258.html)
