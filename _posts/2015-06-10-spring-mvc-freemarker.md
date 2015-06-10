---
layout: post
title: "SpringMvc中使用FreeMarker模板引擎"
description: "SpringMvc中使用FreeMarkder模板引擎"
category:Spring
tags: [Spring, FreeMarker]

---

#### servlet中添加FreeMarker配置

```xml
<!-- freemarker的配置 -->
    <bean id="freemarkerConfigurer"
        class="org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer">
        <property name="templateLoaderPath" value="/WEB-INF/view/" />
        <property name="defaultEncoding" value="GBK" />
        <property name="freemarkerSettings">
            <props>
                <prop key="template_update_delay">10</prop>
                <prop key="locale">zh_CN</prop>
                <prop key="datetime_format">yyyy-MM-dd HH:mm:ss</prop>
                <prop key="date_format">yyyy-MM-dd</prop>
                <prop key="number_format">#.##</prop>
            </props>
        </property>
    </bean>
    <!-- FreeMarker视图解析 如返回userinfo。。在这里配置后缀名ftl和视图解析器。。 -->
    <bean id="viewResolver"
        class="org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver">
        <property name="viewClass"
            value="org.springframework.web.servlet.view.freemarker.FreeMarkerView" />
        <property name="suffix" value=".ftl" />
        <property name="contentType" value="text/html;charset=GBK" />
        <property name="exposeRequestAttributes" value="true" />
        <property name="exposeSessionAttributes" value="true" />
        <property name="exposeSpringMacroHelpers" value="true" />
    </bean>
```

#### 添加FreeMarker的jar包依赖

```xml
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>2.3.20</version>
</dependency>
```

