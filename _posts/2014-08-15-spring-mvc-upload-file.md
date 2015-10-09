---
layout: post
title: "SpringMVC中的文件上传 "
description: ""
category: Java
tags: [Java, Spring]
---

### /WEB-INF/web.xml 配置
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5"
  xmlns="http://java.sun.com/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
  http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">
  <servlet>
    <servlet-name>upload</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>upload</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>

  <filter>
    <filter-name>SpringCharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>SpringCharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>

  <welcome-file-list>
    <welcome-file>/WEB-INF/jsp/user/add.jsp</welcome-file>
  </welcome-file-list>
</web-app>
```

### /WEB-INF/upload-servlet.xml 配置
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:mvc="http://www.springframework.org/schema/mvc"
  xmlns:context="http://www.springframework.org/schema/context"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
            http://www.springframework.org/schema/mvc
            http://www.springframework.org/schema/mvc/spring-mvc-3.1.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context-3.0.xsd">
  <context:component-scan base-package="com.jadyer"/>

  <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/jsp/"/>
    <property name="suffix" value=".jsp"/>
  </bean>

  <!-- SpringMVC上传文件时，需要配置MultipartResolver处理器 -->
  <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <property name="defaultEncoding" value="UTF-8"/>
    <!-- 指定所上传文件的总大小不能超过200KB。注意maxUploadSize属性的限制不是针对单个文件，而是所有文件的容量之和 -->
    <property name="maxUploadSize" value="200000"/>
  </bean>

  <!-- SpringMVC在超出上传文件限制时，会抛出org.springframework.web.multipart.MaxUploadSizeExceededException -->
  <!-- 该异常是SpringMVC在检查上传的文件信息时抛出来的，而且此时还没有进入到Controller方法中 -->
  <bean id="exceptionResolver" class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
    <property name="exceptionMappings">
      <props>
        <!-- 遇到MaxUploadSizeExceededException异常时，自动跳转到/WEB-INF/jsp/error_fileupload.jsp页面 -->
        <prop key="org.springframework.web.multipart.MaxUploadSizeExceededException">error_fileupload</prop>
      </props>
    </property>
  </bean>
</beans>
```

### /WEB-INF/jsp/user/add.jsp 上传表单页面
``` html
    <%@ page language="java" pageEncoding="UTF-8"%>
    <form action="<%=request.getContextPath()%>/user/add" method="POST" enctype="multipart/form-data">
        username: <input type="text" name="username"/><br/>
        nickname: <input type="text" name="nickname"/><br/>
        password: <input type="password" name="password"/><br/>
        yourmail: <input type="text" name="email"/><br/>
        yourfile: <input type="file" name="myfiles"/><br/>
        yourfile: <input type="file" name="myfiles"/><br/>
        yourfile: <input type="file" name="myfiles"/><br/>
        <input type="submit" value="添加新用户"/>
    </form>
```

### /WEB-INF/jsp/user/list.jsp 打印用户信息的页面
```html
    <%@ page language="java" pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    <c:forEach items="${users}" var="user">
        ${user.value.username}----${user.value.nickname}----${user.value.password}----${user.value.email}
            <a href="<%=request.getContextPath()%>/user/${user.value.username}">查看</a>
            <a href="<%=request.getContextPath()%>/user/${user.value.username}/update">编辑</a>
            <a href="<%=request.getContextPath()%>/user/${user.value.username}/delete">删除</a>
        <br/>
    </c:forEach>
    <br/>
    <a href="<%=request.getContextPath()%>/user/add">继续添加用户</a>
```

### /WEB-INF/jsp/error_fileupload.jsp 上传文件内容过大时的提示页面
```html
    <%@ page language="java" pageEncoding="UTF-8"%>
    <h1>文件过大，请重新选择</h1>
```

### User.java 实体类
```java
    package com.jadyer.model;

    /**
     * User
     * @author 宏宇
     * @create May 12, 2012 1:24:43 AM
     */
    public class User {
        private String username;
        private String nickname;
        private String password;
        private String email;
        /*==四个属性的getter()、setter()略==*/
        public User() {}
        public User(String username, String nickname, String password, String email) {
            this.username = username;
            this.nickname = nickname;
            this.password = password;
            this.email = email;
        }
    }
```

### UserController.java 核心
``` java
    package com.jadyer.controller;

    import java.io.File;
    import java.io.IOException;
    import java.util.HashMap;
    import java.util.Map;

    import javax.servlet.http.HttpServletRequest;

    import org.apache.commons.io.FileUtils;
    import org.springframework.stereotype.Controller;
    import org.springframework.ui.Model;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestMethod;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.multipart.MultipartFile;

    import com.jadyer.model.User;

    /**
     * SpringMVC中的文件上传
     * @see 第一步：由于SpringMVC使用的是commons-fileupload实现，故将其组件引入项目中
     * @see       这里用到的是commons-fileupload-1.2.2.jar和commons-io-2.0.1.jar
     * @see 第二步：在####-servlet.xml中配置MultipartResolver处理器。可在此加入对上传文件的属性限制
     * @see 第三步：在Controller的方法中添加MultipartFile参数。该参数用于接收表单中file组件的内容
     * @see 第四步：编写前台表单。注意enctype="multipart/form-data"以及<input type="file" name="****"/>
     * @author 宏宇
     * @create May 12, 2012 1:26:21 AM
     */
    @Controller
    @RequestMapping("/user")
    public class UserController {
        private final static Map<String,User> users = new HashMap<String,User>();

        //模拟数据源,构造初始数据
        public UserController(){
            users.put("张起灵", new User("张起灵", "闷油瓶", "02200059", "menyouping@yeah.net"));
            users.put("李寻欢", new User("李寻欢", "李探花", "08866659", "lixunhuan@gulong.cn"));
            users.put("拓拔野", new User("拓拔野", "搜神记", "05577759", "tuobaye@manhuang.cc"));
            users.put("孙悟空", new User("孙悟空", "美猴王", "03311159", "sunhouzi@xiyouji.zh"));
        }

        @RequestMapping("/list")
        public String list(Model model){
            model.addAttribute("users", users);
            return "user/list";
        }

        @RequestMapping(value="/add", method=RequestMethod.GET)
        public String addUser(){
            return "user/add";
        }
        @RequestMapping(value="/add", method=RequestMethod.POST)
        public String addUser(User user, @RequestParam MultipartFile[] myfiles, HttpServletRequest request) throws IOException{
            //如果只是上传一个文件，则只需要MultipartFile类型接收文件即可，而且无需显式指定@RequestParam注解， name还得是myfiles
            //如果想上传多个文件，那么这里就要用MultipartFile[]类型来接收文件，并且还要指定@RequestParam注解
            //并且上传多个文件时，前台表单中的所有<input type="file"/>的name都应该是myfiles，否则参数里的myfiles无法获取到所有上传的文件
            for(MultipartFile myfile : myfiles){
                if(myfile.isEmpty()){
                    System.out.println("文件未上传");
                }else{
                    System.out.println("文件长度: " + myfile.getSize());
                    System.out.println("文件类型: " + myfile.getContentType());
                    System.out.println("文件名称: " + myfile.getName());
                    System.out.println("文件原名: " + myfile.getOriginalFilename());
                    System.out.println("========================================");
                    //如果用的是Tomcat服务器，则文件会上传到\\%TOMCAT_HOME%\\webapps\\YourWebProject\\WEB-INF\\upload\\文件夹中
                    String realPath = request.getSession().getServletContext().getRealPath("/WEB-INF/upload");
                    //这里不必处理IO流关闭的问题，因为FileUtils.copyInputStreamToFile()方法内部会自动把用到的IO流关掉，我是看它的源码才知道的
                    FileUtils.copyInputStreamToFile(myfile.getInputStream(), new File(realPath, myfile.getOriginalFilename()));
                }
            }
            users.put(user.getUsername(), user);
            return "redirect:/user/list";
        }
    }
```

### /WEB-INF/upload/ 上传目录

### maven配置
  上传功能依赖 SpringMVC-3.1.1、commons-fileupload-1.3.1和commons-io-2.4, 直接使用了目前最新的版本
``` xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>SpringMVC_UploadFile_Demo</groupId>
  <artifactId>SpringMVC_UploadFile_Demo</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>war</packaging>

  <repositories>
    <repository>
      <id>oschina</id>
      <url>http://maven.oschina.net/content/groups/public/</url>
    </repository>
  </repositories>

  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>3.0.5.RELEASE</version>
    </dependency>

    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>servlet-api</artifactId>
      <version>2.5</version>
      <scope>provided</scope>
    </dependency>

    <dependency>
      <groupId>commons-fileupload</groupId>
      <artifactId>commons-fileupload</artifactId>
      <version>1.3.1</version>
    </dependency>

    <dependency>
      <groupId>commons-io</groupId>
      <artifactId>commons-io</artifactId>
      <version>2.4</version>
    </dependency>

    <dependency>
      <groupId>jstl</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
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

#### 注意事项
  * pom文件中必须添加common-upload的jar包依赖
    否则会提示错误:  org.springframework.web.bind.MissingServletRequestParameterException: Required MultipartFile[] parameter 'myfiles' is not present
  * form属性必须设置为enctype="multipart/form-data" method="post"
    否则会提示错误: org.springframework.web.multipart.MultipartException: The current request is not a multipart request

### 访问测试
  http://127.0.0.1:8080/{web应用名}/user/add
  http://127.0.0.1:8080/{web应用名}/user/list

### [Demo代码](https://github.com/anaer/SpringMVC_UploadFile_Demo)

### 参考
  * [SpringMVC中的文件上传 ](http://blog.csdn.net/jadyer/article/details/7575934)
  * [SpringMVC文件上传](http://tzwzero-163-com.iteye.com/blog/1697184)
