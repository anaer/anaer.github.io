---
layout: post
title: ""
description: ""
category:
tags: []

---

### 使用BeanNameAutoProxyCreator实现方法执行前和执行后的日志记录

#### 首先实现方法执行前和执行后的日志记录
```java
package com.common.aop.log;

import java.lang.reflect.Method;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.MethodBeforeAdvice;

public class LogMethodBeforeAdvice implements MethodBeforeAdvice {
    private static Logger LOGGER = LoggerFactory.getLogger(LogMethodBeforeAdvice.class);

    @Override
    public void before(Method arg0, Object[] arg1, Object arg2)
            throws Throwable {
        String args = "";
        if(arg1 != null) {
            for(int i = 0; i < arg1.length; ++i) {
                if(i != arg1.length - 1) {
                    args += arg1[i] + ",";
                } else {
                    args += arg1[i];
                }
            }
        }
        LOGGER.info(arg0.getName() + "方法开始执行,参数为[" + args + "]");
    }

}
```

```java
package com.common.aop.log;

import java.lang.reflect.Method;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.AfterReturningAdvice;

public class LogMethodAfterReturningAdvice implements AfterReturningAdvice {
    private static final Logger LOGGER = LoggerFactory.getLogger(LogMethodAfterReturningAdvice.class);

    @Override
    public void afterReturning(Object returnValue, Method method,
            Object[] args, Object target) throws Throwable {
        LOGGER.info(method.getName() + "执行结果为" + returnValue);
    }

}
```
#### 配置BeanNameAutoProxyCreator代理，实现所有以Controller,Service,Dao结尾的方法自动代理
```xml
    <bean id="logMethodBefore" class="com.common.aop.log.LogMethodBeforeAdvice" />

    <bean id="logAfterReturning" class="com.common.aop.log.LogMethodAfterReturningAdvice" />

    <bean class="org.springframework.aop.framework.autoproxy.BeanNameAutoProxyCreator">
        <property name="beanNames">
            <list>
                <value>*Action</value>
                <value>*Service</value>
                <value>*Dao</value>
            </list>
        </property>
        <property name="interceptorNames">
            <list>
                <value>logMethodBefore</value>
                <value>logAfterReturning</value>
            </list>
        </property>
    </bean>
```
