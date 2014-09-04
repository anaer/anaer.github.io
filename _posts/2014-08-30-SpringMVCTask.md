---
layout: post
title: "Spring使用注解执行定时任务"
description: ""
category: Java
tags: [SpringMVC]
---

# 环境搭建  
  * 参考[Java Web 开发](/2014/08/15/JavaWeb/)  
    搭建开发环境

# 配置web.xml
  
  ```xml
  <!-- /SpringMVC_Task_Demo/src/main/webapp/WEB-INF/web.xml -->
  <?xml version="1.0" encoding="UTF-8"?>
  <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	  xmlns="http://java.sun.com/xml/ns/javaee"
	  xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
	  id="WebApp_ID" version="2.5">
	  <display-name>SpringMVC_Task_Demo</display-name>

	  <listener>
		  <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	  </listener>

	  <welcome-file-list>
		  <welcome-file>index.html</welcome-file>
	  </welcome-file-list>
  </web-app>
  ```

# 配置applicationContext.xml

  ```xml
  <!-- /SpringMVC_Task_Demo/src/main/webapp/WEB-INF/applicationContext.xml -->
  <?xml version="1.0" encoding="GB2312"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
	  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
	  xmlns:task="http://www.springframework.org/schema/task"
	  xsi:schemaLocation="
		  http://www.springframework.org/schema/beans
		  http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
		  http://www.springframework.org/schema/context
		  http://www.springframework.org/schema/context/spring-context-3.0.xsd
			  http://www.springframework.org/schema/task
	  http://www.springframework.org/schema/task/spring-task-3.0.xsd">

	  <task:annotation-driven />
	  <bean
		  class="org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor" />
	  <context:component-scan base-package="com.task.springTask" />  
  </beans>
  ```

# 编写任务类SpringTask.java

  ```java
  // /SpringMVC_Task_Demo/src/main/java/com/task/springTask/SpringTask.java
  package com.task.springTask;

  import org.springframework.scheduling.annotation.Scheduled;
  import org.springframework.stereotype.Component;

  @Component("springTask")
  public class SpringTask {
	  @Scheduled(cron = "0/2 * * * * ?")
	  public void myTask() {
	  System.out.println("这个任务两秒执行一次！");
	  }

  }
  ```

# 配置Maven依赖pom.xml

  ```xml
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>SpringMVC_Task_Demo</groupId>
	<artifactId>SpringMVC_Task_Demo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>war</packaging>
	<dependencies>
			<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-web</artifactId>
			<version>4.0.4.RELEASE</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>4.0.4.RELEASE</version>
		</dependency>
	</dependencies>
	<build>
		<plugins>
			<plugin>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>3.1</version>
				<configuration>
					<source>1.6</source>
					<target>1.6</target>
				</configuration>
			</plugin>
			<plugin>
				<artifactId>maven-war-plugin</artifactId>
				<version>2.4</version>
				<configuration>
					<failOnMissingWebXml>false</failOnMissingWebXml>
				</configuration>
			</plugin>
		</plugins>
	</build>
  </project>
  ```
# 测试  
  web应用启动时，自动调定时任务

# 代码地址
  https://github.com/anaer/SpringMVC_Task_Demo

# 参考  
  * [Spring使用注解执行定时任务](http://blog.csdn.net/zhuang902/article/details/38902679)
  * [spring 3 中使用注解的方式来进行任务调度](http://blog.csdn.net/xwygn/article/details/19042941)
  * [Spring定时任务的几种实现](http://gong1208.iteye.com/blog/1773177)
