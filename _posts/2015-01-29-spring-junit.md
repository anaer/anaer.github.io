---
layout: post
title: "Spring Junit单元测试"
file: 2015-01-29-spring-junit.md
update: 2015-03-04 09:39
description: "Spring Junit单元测试"
category:Spring
tags: [Spring]

---

#### 添加maven依赖

```xml
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>4.0.2.RELEASE</version>
        </dependency>
```

#### 读取配置文件
    
    假设Spring配置文件为applicationContext.xml
    文件路径:src/main/resources
    代码:
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");  
    注解:
        @RunWith(SpringJUnit4ClassRunner.class)  
        @ContextConfiguration(locations={"classpath:applicationContext.xml"})  

    文件路径:WEB-INF
    代码:
        ApplicationContext applicationContext = new FileSystemXmlApplicationContext("src/main/webapp/WEB-INF/applicationContext.xml");  
    注解:
        @RunWith(SpringJUnit4ClassRunner.class)  
        @ContextConfiguration(locations={"file:src/main/webapp/WEB-INF/applicationContext.xml"})   

#### 测试代码

  ```java
  package com.service;

  import javax.annotation.Resource;

  import org.junit.Test;
  import org.junit.runner.RunWith;
  import org.springframework.test.context.ContextConfiguration;
  import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

  @RunWith(SpringJUnit4ClassRunner.class)
  @ContextConfiguration(locations = { "classpath:spring/servlet-beans.xml", "classpath:spring/database-beans.xml" })
  public class SiteServiceTest {
      @Resource
      private ISiteService userService;

      @Test
      public void testCount() {
          int result = userService.count(null);
          System.out.println(result);
      }
  }
  ```

#### 说明
  
    测试代码路径:src/test/java/com.service/SiteServiceTest.java
    资源文件路径:src/test/resources/spring/servlet-beans.xml
                 src/test/resources/spring/database-beans.xml
                 src/test/resources/jdbc.properties
                 src/test/resources/log4j.properties

    其中:database-beans.xml读取jdbc.properties的配置
    <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
        <property name="locations" value="jdbc.properties" />
    </bean>

### 参考
  * [Spring Junit 读取WEB-INF下的配置文件 ](http://blog.csdn.net/rj042/article/details/7549462)
  * [Spring Junit 读取WEB-INF下的配置文件 ](http://blog.csdn.net/linminqin/article/details/6410177)
