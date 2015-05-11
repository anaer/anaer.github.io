---
layout: post
title: "Spring使用Quartz执行定时任务"
description: ""
category: task
tags: [spring, quartz, task]
---

#### 添加quartz jar包依赖
    以下代码使用的quartz 1.8.4版本，如果使用新版本jar包, 配置可能不一致
   
```xml
        <dependency>
            <groupId>org.quartz-scheduler</groupId>
            <artifactId>quartz</artifactId>
            <version>1.8.4</version>
        </dependency>
```

#### 添加quartz配置

```xml
    <!-- 线程执行器配置，用于任务注册 -->
    <bean id="executor" class="org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor">
        <property name="corePoolSize" value="10" />
        <property name="maxPoolSize" value="100" />
        <property name="queueCapacity" value="500" />
    </bean>

    <!-- 业务对象 -->
    <bean id="bizObject" class="com.task.QuartzTask" />

    <!-- 调度业务 -->
    <bean id="jobDetail" class="org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean">
        <property name="targetObject" ref="bizObject" />
        <property name="targetMethod" value="quartzTask" />
    </bean>

    <!-- 调度触发器 -->
    <bean id="cronTrigger" class="org.springframework.scheduling.quartz.CronTriggerBean">
        <property name="jobDetail" ref="jobDetail" />
        <property name="cronExpression" value="10 0/1 * * * ?" />
    </bean>

    <bean id="taskTrigger" class="org.springframework.scheduling.quartz.SimpleTriggerBean">
        <property name="jobDetail" ref="jobDetail" />
        <property name="startDelay" value="5000" />
        <property name="repeatInterval" value="5000" />
    </bean>

    <!-- 设置调度 -->
    <bean class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
        <property name="triggers">
            <list>
                <!--
                    <ref bean="cronTrigger"/>
                -->
                <ref bean="taskTrigger" />
            </list>
        </property>
        <property name="taskExecutor" ref="executor" />
    </bean>
```

#### 实现定时任务代码

```java
package com.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class QuartzTask {
    private static final Logger logger = LoggerFactory.getLogger(QuartzTask.class);

    public void quartzTask() {
        logger.info("执行Quartz任务...");
    }
}

```

### 参考
  * [Spring集成Quartz定时任务框架介绍和Cron表达式详解](http://www.cnblogs.com/obullxl/archive/2011/07/10/spring-quartz-cron-integration.html)