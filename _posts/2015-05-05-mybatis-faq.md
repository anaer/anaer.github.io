---
layout: post
title: "mybatis常见问题"
description: "mybatis常见问题"
category: mybatis
tags: [mybatis, faq]
---

#### 使用MyBatis往MySQL数据库中插入一条记录后，需要返回该条记录的自增主键值。

```xml
    <insert id="insertAndGetId" useGeneratedKeys="true" keyProperty="userId" parameterType="com.chenzhou.mybatis.User">
        insert into user(userName,password,comment)
        values(#{userName},#{password},#{comment})
    </insert>
```

#### 信息: Illegal access: this web application instance has been stopped already.  Could not load net.sf.ehcache.store.disk.Segment$1.  The eventual following stack trace is caused by an error thrown for debugging purposes as well as to attempt to terminate the thread which caused the illegal access, and has no functional impact.  java.lang.IllegalStateException ...

    这个问题 暂时没影响

#### org.apache.ibatis.exceptions.TooManyResultsException: Expected one result (or null) to be returned by selectOne(), but found: 2

    这个错误的原因就是因为你的查询方法中得到两个两个结果集,然而你的返回用了一个实体去接收，程序这个时候就不知道如何去分配了，很果断的报这个错,
    修改方法为使用一个list来接收就没有问题了。

#### Type interface com.souvi.ibatis.xxxMapper is  not known to the MapperRegistry
	1. 代码未注册

	  ```java
	  factory.getConfiguration().addMapper(UserInfoMapper.class);
	  ```
	2. 配置文件没配置或者没配对 如namespace等

#### org.apache.ibatis.binding.BindingException: Type interface com.mybatis3.mappers.StudentMapper is already known to the MapperRegistry.
	上面那个问题产生的，重复注册

#### Invalid bound statement (not found)
	1. namespace不对
	2. xml中未定义方法
	3. 返回List,未配置ResultMap

#### The processing instruction must begin with the name of the target.
错误原因<? xml version="1.0" encoding="UTF-8" ?>这里面有空格

#### Cannot find class: org.apache.derby.jdbc.EmbeddedDriver
需要导入derby的jar包 C:\Program Files\Sun\JavaDB\lib

#### Error querying database.  Cause: org.springframework.jdbc.CannotGetJdbcConnectionException: Could not get JDBC Connection; nested exception is java.sql.SQLException: An attempt by a client to checkout a Connection has timed out.
数据库配置不对

#### mapper.xml中使用特殊符号
```xml
        <if test="begin_date_time !=null and begin_date_time !='' ">
              <![CDATA[ and DATE_FORMAT(create_datetime, '%Y%m%d%H%i%s') >=DATE_FORMAT(#{begin_date_time},'%Y%m%d%H%i%s')]]>
        </if>
        <if test="end_date_time !=null and end_date_time !='' ">
              <![CDATA[ and DATE_FORMAT(create_datetime, '%Y%m%d%H%i%s') <=DATE_FORMAT(#{end_date_time},'%Y%m%d%H%i%s')]]>
        </if>
```
### 参考
  * [ MyBatis+MySQL 返回插入的主键ID ](http://chenzhou123520.iteye.com/blog/1849881)
