---
layout: post
title: "eclipse中设置${user}变量"
description: ""
category: eclipse
tags: [eclipse]
---

在使用Eclipse编写Java代码时，自动生成的注释信息都是默认是使用的当前登录系统用户名：

```java
/**
* @author administrator
*/
```

如果我们想修改成我们自己的名字怎么办呢? 以下介绍的三种方法也可以应用在MyEclipse中

* 方法一. 修改Eclipse 启动参数
在Eclipse启动时加入启动参数或eclipse.ini中添加一句 -vmargs -Duser.name="whateveryouwant"

* 方法二. 修改Eclipse代码模板
通过菜单 Window->Preference -> Java -> Code Style -> Code Templates 在右侧选择Comments,将其中的Types项，然后选右边的"Edit"，进入编辑模式，将 @author ${user} 中的${user}改成你自己的名字即可。

* 方法三. 修改操作系统的用户名
控制面板-->计算机管理-->本地用户和组-->用户，使用管理员账户登陆 可以任意修改用户名 ，然后重启电脑，OK 。

总结：推荐方法一和二，不推荐方法三。

最好是在建类的时候也加上创建日期如：

/**
* ${tags}
* @author ${user}
* @creation ${date}
*/

