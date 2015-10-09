---
layout: post
title: "druid数据源"
description: "druid数据源"
category: database
tags: [database, druid]
---

#### 添加依赖包

```xml
<!-- 加入druid数据源依赖包 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.0.7</version>
</dependency>
```

#### 在web.xml中添加druid配置

```xml
<!-- druid配置 -->
<filter>
    <filter-name>DruidWebStatFilter</filter-name>
    <filter-class>com.alibaba.druid.support.http.WebStatFilter</filter-class>
    <init-param>
        <param-name>exclusions</param-name>
        <param-value>/static/*,*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>DruidWebStatFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
<!-- druid监控 -->
<servlet>
    <servlet-name>DruidStatView</servlet-name>
    <servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>DruidStatView</servlet-name>
    <url-pattern>/druid/*</url-pattern>
</servlet-mapping>
```

#### 添加数据源配置

```xml
  <!-- 数据源配置, 使用 BoneCP 数据库连接池 -->
    <bean id="slave" class="com.alibaba.druid.pool.DruidDataSource" init-method="init"
        destroy-method="close">
        <!-- 数据源驱动类可不写，Druid默认会自动根据URL识别DriverClass -->
        <property name="driverClassName" value="${jdbc.driverClassName}" />
        <!-- 基本属性 url、user、password -->
        <property name="url" value="${jdbc.url}" />
        <property name="username" value="${jdbc.username}" />
        <property name="password" value="${jdbc.password}" />
        <!-- 配置初始化大小、最小、最大 -->
        <property name="initialSize" value="3" />
        <property name="minIdle" value="3" />
        <property name="maxActive" value="20" />
        <!-- 配置获取连接等待超时的时间 -->
        <property name="maxWait" value="60000" />
        <!-- 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒 -->
        <property name="timeBetweenEvictionRunsMillis" value="60000" />
        <!-- 配置一个连接在池中最小生存的时间，单位是毫秒 -->
        <property name="minEvictableIdleTimeMillis" value="300000" />
        <property name="validationQuery" value="SELECT 'x'" />
        <property name="testWhileIdle" value="true" />
        <property name="testOnBorrow" value="false" />
        <property name="testOnReturn" value="false" />
        <!-- 打开PSCache，并且指定每个连接上PSCache的大小（Oracle使用）
        <property name="poolPreparedStatements" value="true" />
        <property name="maxPoolPreparedStatementPerConnectionSize" value="20" /> -->
        <!-- 配置监控统计拦截的filters -->
        <property name="filters" value="stat" />
    </bean>
```

#### 查看监控信息
    访问druid/index.html

### 参考
  * [druid wiki](https://github.com/alibaba/druid/wiki/%E9%A6%96%E9%A1%B5)
  * [Spring整合阿里巴巴开源数据源Druid](http://www.html580.com/9880)
