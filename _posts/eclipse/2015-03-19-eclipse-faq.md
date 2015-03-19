---
layout: post
title: "eclipse faq"
file: 2015-03-19-eclipse-faq.md
update: 2015-03-19 21:33
description: ""
category:Eclipse
tags: [Eclipse]

---

### 常见错误

#### Implementation of project facet me.spring could not be found. Functionality will be limited.

    编辑工程目录下.settings/org.eclipse.wst.common.project.facet.core.xml
    删除提示未找到的配置, 如me.spring

#### processWorkerExit

    去掉java->debug->suspend execution on uncaught exceptions 选项前的对勾就行了。

#### No grammar constraints (DTD or XML schema).....两种解决方法
    A:
    方法一：常用方法   关闭XML验证
    工具栏：windows => preferences => xml => xml files => validation => Indicate when no grammar is specified:选择Ignore即可。

    方法二：（个人推荐）
    添加 内容如下
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "<http://www.w3.org/2002/xmlspec/dtd/2.10/xmlspec.dtd>">

#### The file cannot be validated as the XML definition mybatis-3-mapper.dtd

    ```
    1.Eclipse中打开window-->Preferences-->XML-->XML catalog
    2.点击add按钮,弹出对话框
    3.ocation中填入你所下载的DTD文件的本机位置;
    Key Type 选择 Public ID;
    Key 则填入xml文档头部 <!DOCTYPE sqlMapConfig PUBLIC 后面的那些.
    -//mybatis.org//DTD Mapper 3.0//EN
    [mybatis-3-mapper.dtd](http://download.csdn.net/detail/yuxiangtong/5349045)
    ```

    配置xsd同样处理

    ```
    Entry element:        URI
    Location:            E:\Program Files\eclipse-luna\dtd\spring-mvc-3.0.xsd
    URI:                   <file:///E:/Program%20Files/eclipse-luna/dtd/spring-mvc-3.0.xsd>
    Key type:            Namespace name
    Key:                <http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd>
    ```

###参考
  * [processWorkerExit](http://blog.csdn.net/lvzhuyiyi4/article/details/16336479)