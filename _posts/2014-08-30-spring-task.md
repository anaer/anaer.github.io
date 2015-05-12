---
layout: post
title: "Spring使用注解执行定时任务"
description: ""
category: spring 
tags: [spring, task]
---

#### 环境搭建  
  * 参考[Java Web 开发](/2014/08/15/JavaWeb/)  
    搭建开发环境

#### 配置web.xml
  
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

#### 配置applicationContext.xml

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

	<context:component-scan base-package="com.task.springTask" />  
    
    <!-- 注解驱动 -->
    <task:annotation-driven />
    
    <!-- 如果定时任务很多，可以配置executor线程池，这里executor的含义和java.util.concurrent.Executor是一样的，pool-size的大小官方推荐为5~10。scheduler的pool-size是ScheduledExecutorService线程池，默认为1。
    <task:annotation-driven executor="myExecutor" scheduler="myScheduler"/>
    <task:executor id="myExecutor" pool-size="5"/>
    <task:scheduler id="myScheduler" pool-size="10"/>
     -->
    
    <!-- 配置文件 -->
    <task:scheduled-tasks>
        <task:scheduled ref="springTask" method="myTask2" cron="0/2 * * * * ?" />
    </task:scheduled-tasks>
    
    <!-- 任务配置 实例
    <task:scheduled-tasks scheduler="myScheduler">
        <task:scheduled ref="beanA" method="methodA" fixed-delay="5000" initial-delay="1000"/>
        <task:scheduled ref="beanB" method="methodB" fixed-rate="5000"/>
        <task:scheduled ref="beanC" method="methodC" cron="*/5 * * * * MON-FRI"/>
    </task:scheduled-tasks>
    -->
</beans>
```

#### 编写任务类SpringTask.java

```java
// /SpringMVC_Task_Demo/src/main/java/com/task/springTask/SpringTask.java
package com.task.springTask;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component("springTask")
public class SpringTask {
    // 注解驱动
    @Scheduled(cron = "0/2 * * * * ?")
    public void myTask() {
        System.out.println("注解调用！");
    }

    //配置文件驱动
    public void myTask2() {
        System.out.println("配置文件调用！");
    }

    @Scheduled(fixedRate = 5000)
    public void myTask3() {
        System.out.println("定时任务: @Scheduled(fixedRate = 5000), 每5000毫秒调用一次");
    }

    @Scheduled(fixedDelay = 5000)
    public void myTask4() {
        System.out.println("定时任务: @Scheduled(fixedDelay=5000), 任务完成后5000毫秒执行下次任务 ");
    }

    @Scheduled(cron = "0 0,30 8-23 * * MON-FRI")
    public void myTask5() {
        System.out.println("定时任务: @Scheduled(cron=\"0 0,30 8-23 ? * MON-FRI\"), 工作日8点到23点,整点与半点的时候执行一次");
    }
}
```

#### 配置Maven依赖pom.xml

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

#### spring配置定时器的时间设置

    Cron表达式由6个（或者7个）空格分隔的时间元素构成。从左至右，元素的定义如下：
    (1)秒(0~59);
    (2)分钟(0~59);
    (3)小时(0~23);
    (4)月份中的日期(1~31);
    (5)月份(1~12或JAN~DEC);
    (6)星期中的日期(1~7或SUN~SAT);
    (7)年份(1970~2099).
    每个元素都可以显示地指定值(如6)、范围(9~12)、列表(9,11,13)或者通配符(如*)。月份中的日期和星期中的日期这两个元素是互斥的，因此应该通过设置一个问号(?)来表明你不想设置的那个字段。

    例子：
    CRON表达式	含义

    0 0 12 * * ?	每天中午十二点触发
    0 15 10 ? * *	每天早上10：15触发
    0 15 10 * * ?	每天早上10：15触发
    0 15 10 * * ? *	每天早上10：15触发
    0 15 10 * * ? 2005	2005年的每天早上10：15触发
    0 * 14 * * ?	每天从下午2点开始到2点59分每分钟一次触发
    0 0/5 14 * * ?	每天从下午2点开始到2：55分结束每5分钟一次触发
    0 0/5 14,18 * * ?	每天的下午2点至2：55和6点至6点55分两个时间段内每5分钟一次触发
    0 0-5 14 * * ?	每天14:00至14:05每分钟一次触发
    0 10,44 14 ? 3 WED	三月的每周三的14：10和14：44触发
    0 15 10 ? * MON-FRI	每个周一、周二、周三、周四、周五的10：15触发 

#### 参考  
  * [Spring任务调度](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/scheduling.html)
  * [Quartz Spring与Spring Task总结](http://www.blogjava.net/bolo/archive/2015/03/12/423408.html)
  * [Spring定时任务的几种实现](http://gong1208.iteye.com/blog/1773177)
  * [Spring使用注解执行定时任务](http://blog.csdn.net/zhuang902/article/details/38902679)