---
layout: post
title: "SpringMVC登录DEMO"
description: ""
category: SpringMVC
tags: [SpringMVC]
---

# 环境搭建  
  * 参考[Java Web 开发](/2014/08/15/JavaWeb/)  
    搭建开发环境

# 配置web.xml

  ```xml
  <!-- /SpringMVC_Login_Demo/src/main/webapp/WEB-INF/web.xml -->
  <?xml version="1.0" encoding="UTF-8"?>
  <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" version="2.5">
	<display-name></display-name>
	<!-- 欢迎页面配置 默认src/main/webapp目录下 -->
	<welcome-file-list>
	  <welcome-file>index.jsp</welcome-file>
	</welcome-file-list>
	<!-- 配置转发servlet -->
	<servlet>
	  <servlet-name>springMVC</servlet-name>
	  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
	  <load-on-startup>1</load-on-startup>
	</servlet>
	<servlet-mapping>
	  <servlet-name>springMVC</servlet-name>
	  <url-pattern>/</url-pattern> <!-- 拦截所有请求 -->
	</servlet-mapping>
  </web-app>
  ```

# 配置springMVC-servlet.xml

  ```xml
  <!-- /SpringMVC_Login_Demo/src/main/webapp/WEB-INF/springMVC-servlet.xml -->
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
	  xmlns:context="http://www.springframework.org/schema/context" xmlns:p="http://www.springframework.org/schema/p"
	  xmlns:mvc="http://www.springframework.org/schema/mvc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	  xsi:schemaLocation="http://www.springframework.org/schema/beans 
					  http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
					  http://www.springframework.org/schema/context
					  http://www.springframework.org/schema/context/spring-context-3.0.xsd
					  http://www.springframework.org/schema/mvc
					  http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd
					  ">
	  <mvc:annotation-driven />
	  <!-- 注释资源扫描包路径 -->
	  <context:component-scan base-package="com.controllers" />
	  <bean
		  class="org.springframework.web.servlet.mvc.annotation.DefaultAnnotationHandlerMapping" />
	  <bean
		  class="org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter" />

	  <!-- 配置视图解析器 -->
	  <bean id="viewResolver"
		  class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		  <property name="prefix" value="/WEB-INF/pages/" />
		  <property name="suffix" value=".jsp" />
	  </bean>
  </beans>                 
  ```

# TestController

  ```java
  ///SpringMVC_Login_Demo/src/main/java/com/controllers/TestController.java
  package com.controllers;

  import javax.servlet.http.HttpServletRequest;

  import org.springframework.stereotype.Controller;
  import org.springframework.web.bind.annotation.RequestMapping;

  import com.models.Student;

  @Controller
  @RequestMapping("/test")
  public class TestController {
	  @RequestMapping(value = "/test")
	  public String test(HttpServletRequest request) {
	  Student s = new Student();
	  System.out.println("name===" + s.getName());
	  System.out.println("password===" + s.getPassword());
	  String userName = request.getParameter("userName");
	  String userPwd = request.getParameter("userPwd");
	  request.setAttribute("userName", userName);
	  if (s.getName().equals(userName) && s.getPassword().equals(userPwd)) {
		  return "success";
	  }
	  return "fail";
	  }
  }
  ```

# 实体Student

  ```java
  // /SpringMVC_Login_Demo/src/main/java/com/models/Student.java
  package com.models;

  public class Student {
	  public int id;
	  public String name = "zs";
	  public String password = "123456";

	  public int getId() {
	  return id;
	  }

	  public void setId(int id) {
	  this.id = id;
	  }

	  public String getName() {
	  return name;
	  }

	  public void setName(String name) {
	  this.name = name;
	  }

	  public String getPassword() {
	  return password;
	  }

	  public void setPassword(String password) {
	  this.password = password;
	  }
  }
  ```

# 首页 index.jsp

```
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
+ request.getServerName() + ":" + request.getServerPort()
+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>My JSP 'index.jsp' starting page</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
<link rel="stylesheet" type="text/css" href="styles.css">
-->
</head>
<body>
<form action="<c:url value="/test/test.do"/>" id="loginForm"
method="post">
<table>
<tr>
<td>
用户名
</td>
<td>
<input type="text" name="userName" />
</td>
</tr>
<tr>
<td>
密码
</td>
<td>
<input type="password" name="userPwd" />
</td>
</tr>
<tr>
<td>
<input type="submit" value="登录" />
</td>
</tr>
</table>
</form>
</body>
</html>
```

# 登录成功页面success.jsp

  ```html
  <!-- /SpringMVC_Login_Demo/src/main/webapp/WEB-INF/pages/success.jsp -->
  <%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
  <%
	  String path = request.getContextPath();
	  String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
  %>

  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
  <html>
  <head>
  <base href="<%=basePath%>">

  <title>My JSP 'index.jsp' starting page</title>
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="0">
  <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
  <meta http-equiv="description" content="This is my page">
  <!--
	  <link rel="stylesheet" type="text/css" href="styles.css">
	  -->
  </head>

  <body>
	  <table>
		  <tr>
			  <td>${userName },登录成功！！！</td>
		  </tr>
	  </table>
  </body>
  </html>
  ```

# 登录失败页面fail.jsp

  ```html
  <%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
  <%
	  String path = request.getContextPath();
	  String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
  %>

  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
  <html>
  <head>
  <base href="<%=basePath%>">

  <title>My JSP 'index.jsp' starting page</title>
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="0">
  <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
  <meta http-equiv="description" content="This is my page">
  <!--
	  <link rel="stylesheet" type="text/css" href="styles.css">
	  -->
  </head>

  <body>
	  <table>
		  <tr>
			  <td>${userName},登录失败！！！</td>
		  </tr>
	  </table>
  </body>
  </html>
  ```

# Maven依赖配置

  ```xml
  <!-- /SpringMVC_Login_Demo/pom.xml -->
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>SpringMVC_Login_Demo</groupId>
	<artifactId>SpringMVC_Login_Demo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>war</packaging>

	<dependencies>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>4.0.0.RELEASE</version>
		</dependency>

		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>servlet-api</artifactId>
			<version>2.5</version>
		</dependency>

		<dependency>
			<groupId>jstl</groupId>
			<artifactId>jstl</artifactId>
			<version>1.2</version>
		</dependency>
	</dependencies>

	<repositories>
		<repository>
			<id>oschina</id>
			<url>http://maven.oschina.net/content/groups/public/</url>
		</repository>
	</repositories>
  </project>
  ```

# 测试

  http://127.0.0.1:8080/SpringMVC_Login_Demo/

# 代码地址
  https://github.com/anaer/SpringMVC_Login_Demo

# 参考  
  * [SpringMVC 登录DEMO ](http://blog.csdn.net/javaweiming/article/details/38927685)
