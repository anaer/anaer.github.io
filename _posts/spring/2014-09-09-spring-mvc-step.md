---
layout: post
title: "SpringMVC项目步骤"
file: 2014-09-09-spring-mvc-step.md
update: 2014-09-09 15:40
description: ""
category: Spring
tags: [SpringMVC]

---

# SpringMVC关于ajax+Spring+MyBatis整合概述 
 1.前期工作

    1.1 数据库建表；

    1.2 新建工程；

    1.3 引入MyBatis-Spring,MyBatis,Spring包；

    2.MyBatis相关

    2.1 建对应表的实体类（Entity）；

    2.2 建mapper映射器接口（XxxMapper.java）；

    2.3 建mapper映射器xml（XxxMapper.xml与映射器接口同名），指定namespace到映射器接口；

    2.4 建Mybatis配置文件mybatis-config.xml,引入mapper映射器xml文件；

    2.4.1 如果mapper映射器xml较多，并且位置分散，适合把mapper映射器xml配置到mybatis-config.xml中，再在SqlSessionFactory的configLocation属性中配置mybatis-config.xml;

    2.4.2 如果mybatis-config.xml只是用来配置mapper映射器xml文件，而全部mapper映射器xml可以采用"**/*.xml"配置在Spring配置文件的SqlSessionFactory的mapperLocations属性里，那么mybatis-config.xml可以省略；

    3.Spring相关

    3.1 在web.xml配置Spring的DispatcherServlet,并指定Spring配置文件applicationContext.xml;

    3.2 配置Srping配置文件applicationContext.xml（重点），主要有：

    3.2.1 context:component-scan

    3.2.2 context:property-placeholder （定义属性占位符的属性配置文件）

    3.2.3 mvc:annotation-driven

    3.2.4 DataSource

    3.2.5 SqlSessionFactory

    3.2.5.1 configLocation属性，配置mybatis-config.xml;

    如果mybatis-config.xml配置了所有Mybatis映射器xml,并且configLocation属性配置mybatis-config.xml,则SqlSessionFactory的mapperLocations属性不用配置；

    3.2.5.2 mapperLocations属性配置Mybatis映射器xml文件；

    如果SqlSessionFactory的mapperLocations属性配置了所有mapper映射器xml文件，而mybatis-config.xml又没有其它配置，那么mybatis-config.xml可以省略，SqlSessionFactory的configLocation属性也不用配置；

    3.2.5.3 typeAliasesPackage属性注册实体类别名；

    3.2.6 TransactionManager

    3.2.7 MapperFactoryBean

    3.2.8 ServiceBean

    3.2.9 ViewResolver

    4.编写Service;

    5.编写Controller;

    6.前端页面编写；

    6.1 编写ajax,发起匹配控制器@RequestMapping一致的URL请求；

# 参考
  * [SpringMVC关于ajax+Spring+MyBatis整合概述](http://java.chinaitlab.com/Spring/952260.html)
