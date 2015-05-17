---
layout: post
title: "mybatis faq"
description: "mybatis faq"
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

### 参考
  * [ MyBatis+MySQL 返回插入的主键ID ](http://chenzhou123520.iteye.com/blog/1849881)