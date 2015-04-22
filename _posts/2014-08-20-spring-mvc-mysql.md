---
layout: post
title: "SpringMVC+Mysql实例详解"
description: ""
category: SpringMVC
tags: [SpringMVC, Mysql]
---

# 环境搭建  
  * 参考[Java Web 开发](/2014/08/15/java-web/)  
    搭建开发环境
---

# 配置web.xml  
  * 路径: /SpringMVC_Mysql_Demo/src/main/webapp/WEB-INF/web.xml  
  * 配置  

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    	xmlns="http://java.sun.com/xml/ns/javaee"
    	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
    	id="WebApp_ID" version="2.5">
    	<display-name>SpringMVC_Mysql_Demo</display-name>

    	<servlet>
    		<!--springmvc的核心是DispatcherServlet，它负责控制整个页面的请求路径 -->
    		<servlet-name>dispatcherServlet</servlet-name>
    		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    		<!--初始化参数>/WEB-INF/classes/相当于src目录 -->
    		<init-param>
    			<!-- 这个param-name必须是contextConfigLocation -->
    			<param-name>contextConfigLocation</param-name>
    			<!-- 配置classpath:applicationContext.xml等同于/WEB-INF/classes/applicationContext.xml -->
    			<param-value>classpath:applicationContext.xml</param-value>
    		</init-param>
    		<load-on-startup>2</load-on-startup>
    	</servlet>
    	<!--拦截所有以do结尾的请求 -->
    	<servlet-mapping>
    		<servlet-name>dispatcherServlet</servlet-name>
    		<url-pattern>*.do</url-pattern>
    	</servlet-mapping>
    	<!--处理从页面传递中文到后台而出现的中文乱码问题 -->
    	<filter>
    		<filter-name>encodingFilter</filter-name>
    		<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    		<init-param>
    			<param-name>encoding</param-name>
    			<param-value>UTF-8</param-value>
    		</init-param>
    	</filter>
    	<filter-mapping>
    		<filter-name>encodingFilter</filter-name>
    		<url-pattern>/*</url-pattern>
    	</filter-mapping>
    	<!-- webapp 为根目录 -->
    	<welcome-file-list>
    		<welcome-file>/WEB-INF/jsp/index.jsp</welcome-file>
    	</welcome-file-list>
    </web-app>
    ```

# 数据库配置db-config.properties  
  * 路径: /SpringMVC_Mysql_Demo/src/main/resources/db-config.properties  
  * 配置:  

    ```
    #如果未指定主机名，默认为“127.0.0.1”。如果未指定端口，默认为“3306”，它是MySQL服务器的默认端口号。
    db.url= jdbc:mysql:///springmvcdb?useUnicode=true&characterEncoding=utf8
    db.username=root
    db.password=password
    db.dirverClass= com.mysql.jdbc.Driver
    ```

# 测试数据  

  ```sql
  Create database springmvcdb ;
  use springmvcdb;

  SET FOREIGN_KEY_CHECKS=0;  
  -- ----------------------------  
  -- Table structure for `usermbo`  
  -- ----------------------------  
  DROP TABLE IF EXISTS `usermbo`;  
  CREATE TABLE `usermbo` (  
   `USERID` int(11) NOT NULL DEFAULT '0',  
   `USERNAME` varchar(50) DEFAULT NULL,  
   `USERAGE` int(11) DEFAULT NULL,  
   PRIMARY KEY (`USERID`)  
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;  

  -- ----------------------------  
  -- Records of usermbo  
  -- ----------------------------  
  INSERT INTO `usermbo` VALUES('1', '李晓红', '25');  
  INSERT INTO `usermbo` VALUES('2', '柳梦璃', '27');  
  INSERT INTO `usermbo` VALUES('3', '韩菱纱', '26');

  select * from usermbo;
  ```

# applicationContext.xml  
  * 路径: /SpringMVC_Mysql_Demo/src/main/resources/applicationContext.xml  
  * 配置:  

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
    	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    	xsi:schemaLocation="http://www.springframework.org/schema/beans
    	http://www.springframework.org/schema/beans/spring-beans-2.5.xsd">
    	<!-- 定义个缺省的控制适配器 -->
    	<bean
    		class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter" />
    	<!-- 获取配置文件 -->
    	<bean id="config"
    		class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
    		<property name="locations">
    			<list>
    				<value>classpath:db-config.properties</value>
    			</list>
    		</property>
    	</bean>
    	<!-- 获取数据源 -->
    	<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
    		<property name="driverClassName">
    			<value>${db.dirverClass}</value>
    		</property>
    		<property name="url">
    			<value>${db.url}</value>
    		</property>
    		<property name="username">
    			<value>${db.username}</value>
    		</property>
    		<property name="password">
    			<value>${db.password}</value>
    		</property>
    	</bean>
    	<!-- URL到处理器的映射列表可以配置多个 mappings属性健值为URL程序文件地址，而值为处理器的Bean名字，URL程序文件地址可采用路径匹配的模式，如：
    		com/mvc/t?st.jsp:匹配com/mvc/test.jsp、com/mvc/tast.jsp等
    		com/mvc/*.jsp ：匹配所有com/mvc/下带jsp后缀的URL
    		com/mvc/**/test.jsp：匹配所有在com/mvc路径下或子孙路径下的test.jsp
    		com/mvc/**/*.jsp：匹配所有com/mvc路径下或子孙路径下带.jsp后缀的URL
    		cn/**/web/bla.jsp：匹配 cn/option/web/dog.jsp cn/option/test/web/dog.jsp cn/web/dog.jsp的请求 -->
    	<bean class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
    		<property name="mappings">
    			<value>
    				user.do=userAction
    			</value>
    		</property>
    	</bean>

    	<!--定义视图通过internalResourceView来表示使用的是Servlet/jsp技术 -->
    	<bean id="viewResolver"
    		class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    		<property name="viewClass">
    			<value>org.springframework.web.servlet.view.InternalResourceView
    			</value>
    		</property>
    		<!--jsp存放的目录  webapp为根目录-->
    		<property name="prefix">
    			<value>/WEB-INF/jsp/</value>
    		</property>
    		<!--jsp文件的后缀 -->
    		<property name="suffix">
    			<value>.jsp</value>
    		</property>
    	</bean>
    	<bean id="userDao" class="com.yjde.springmvc.UserDao">
    		<property name="dataSource" ref="dataSource"></property>
    	</bean>
    	<!--定义控制器 -->
    	<bean id="userAction" class="com.yjde.springmvc.UserController">
    		<property name="dao">
    			<ref bean="userDao" />
    		</property>
    		<property name="commandClass">
    			<value>com.yjde.springmvc.UserDao</value>
    		</property>
    		<property name="viewpage">
    			<value>userInfo</value>
    		</property>
    	</bean>
    </beans>  
    ```

# UserDao.java  
  * 路径: /SpringMVC_Mysql_Demo/src/main/java/com/yjde/springmvc/UserDao.java  
  * 代码:  

    ```java
    package com.yjde.springmvc;  

    import java.sql.ResultSet;  
    import java.sql.SQLException;  
    import java.util.Collection;  
    import java.util.List;  

    import org.springframework.jdbc.core.RowMapper;  
    import org.springframework.jdbc.core.support.JdbcDaoSupport;  

    //JdbcTemplate是core包的核心类。它替我们完成了资源的创建以及释放工作，从而简化了我们对JDBC的使用。它还可以帮助我们避免一些常见的错误，比如忘记关闭数据库连接。具体请参阅API  
    @SuppressWarnings("all")  
    public class UserDao extends JdbcDaoSupport {  
        private String msg;  

        public String getMsg() {  
            return msg;  
        }  

        public void setMsg(String msg) {  
            this.msg = msg;  
        }  

        // 此方法把USEMBO表对应的字段查询出来依次放入userPO中  
        public Collection<UserPO> doquery() {  
            String sql = "SELECT T.USERID,T.USERNAME,T.USERAGE FROM USERMBO T";  
            return super.getJdbcTemplate().query(sql, new RowMapper() {  

                public Object mapRow(ResultSet rs, int num) throws SQLException {  
                    UserPO user = new UserPO();  
                    user.setUserId(rs.getInt("USERID"));  
                    user.setUserName(rs.getString("USERNAME"));  
                    user.setUserAge(rs.getInt("USERAGE"));  
                    return user;  
                }  
            });  
        }  
    }
    ```

# UserController.java  
  * 路径: /SpringMVC_Mysql_Demo/src/main/java/com/yjde/springmvc/UserController.java  
  * 代码:

    ```java
    package com.yjde.springmvc;  

    import java.io.PrintWriter;  
    import java.util.ArrayList;  
    import java.util.Collection;  
    import java.util.HashMap;  
    import java.util.List;  
    import java.util.Map;  

    import javax.servlet.http.HttpServletRequest;  
    import javax.servlet.http.HttpServletResponse;  


    import org.springframework.validation.BindException;  
    import org.springframework.web.servlet.ModelAndView;  
    import org.springframework.web.servlet.mvc.SimpleFormController;  

    @SuppressWarnings("all")  
    // SimpleFormController是spring提供的表单控制器，把页面中Form中的元素名称设定为和bean中的一样，当传入的时候Spring会自动抓取form中和Bean名称一样的元素值，把它转换成一个bean,使得开发人员可以很方便的使用。  
    public class UserController extends SimpleFormController {  
        private String viewpage;  
        private UserDao dao;  

        public String getViewpage() {  
            return viewpage;  
        }  

        public void setViewpage(String viewpage) {  
            this.viewpage = viewpage;  
        }  

        @Override  
        protected ModelAndView onSubmit(HttpServletRequest request,  
                HttpServletResponse response, Object command, BindException errors)  
                throws Exception {  
            UserDao tmp = (UserDao) command;  
            Collection<UserPO> list = dao.doquery();  
            List<UserPO> users = new ArrayList<UserPO>();  
            UserPO user;  
            for (UserPO userPO : list) {  
                user = new UserPO();  
                user.setUserId(userPO.getUserId());  
                user.setUserName(userPO.getUserName());  
                user.setUserAge(userPO.getUserAge());  
                users.add(user);  
            }  
            Map mp = new HashMap();  
            mp.put("list", users);  
            return new ModelAndView(getViewpage(), mp);  
        }  

        public void setDao(UserDao dao) {  
            this.dao = dao;  
        }  

    }  
    ```

---

# UserPO.java  
  * 路径: /SpringMVC_Mysql_Demo/src/main/java/com/yjde/springmvc/UserPO.java  
  * 代码:  

    ```java
    package com.yjde.springmvc;  

    public class UserPO {  
        private Integer userId;  
        private String userName;  
        private Integer userAge;  

        public Integer getUserId() {  
            return userId;  
        }  

        public void setUserId(Integer userId) {  
            this.userId = userId;  
        }  

        public String getUserName() {  
            return userName;  
        }  

        public void setUserName(String userName) {  
            this.userName = userName;  
        }  

        public Integer getUserAge() {  
            return userAge;  
        }  

        public void setUserAge(Integer userAge) {  
            this.userAge = userAge;  
        }  
    }  
    ```

---

# index.jsp  
  * 路径: /SpringMVC_Mysql_Demo/src/main/webapp/WEB-INF/jsp/index.jsp  
  * 代码:

    ```html
    <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
    	<form action="user.do" method="post">
    		请输入<input name="msg" type="text" /> <input type="submit" value="提交">
    	</form>
    </body>
    </html>

    ```

---

# userInfo.jsp  
  * 路径: /SpringMVC_Mysql_Demo/src/main/webapp/WEB-INF/jsp/userInfo.jsp  
  * 代码:

    ```html
    <%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <%@page import="com.yjde.springmvc.UserPO"%>
    <%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    List<UserPO> str= (List<UserPO>)request.getAttribute("list");
    %>

    <html>
      <head>
        <base href="<%=basePath%>">

        <title>SpringMVC</title>

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
      <table border="1" width="500" align="center">
      		<tr>
    			<td >编号</td>
    			<td >姓名</td>
    			<td >年龄</td>
    		</tr>
       <%
       		for(UserPO user:str){
       			%>
       				<tr>
       					<td><%=user.getUserId() %></td>
       					<td><%=user.getUserName() %></td>
       					<td><%=user.getUserAge() %></td>
       				</tr>
       			<%
       		}
        %>
        </table>
      </body>
    </html>


    ```

---

# pom.xml  
  * 路径: /SpringMVC_Mysql_Demo/pom.xml  
  * 配置:  

    ```xml
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  	<modelVersion>4.0.0</modelVersion>
  	<groupId>SpringMVC_Mysql_Demo</groupId>
  	<artifactId>SpringMVC_Mysql_Demo</artifactId>
  	<version>0.0.1-SNAPSHOT</version>
  	<packaging>war</packaging>

  	<dependencies>
  		<dependency>
  			<groupId>org.springframework</groupId>
  			<artifactId>spring-jdbc</artifactId>
  			<version>3.0.5.RELEASE</version>
  		</dependency>

  		<dependency>
  			<groupId>org.springframework</groupId>
  			<artifactId>spring-webmvc</artifactId>
  			<version>3.0.5.RELEASE</version>
  		</dependency>

  		<dependency>
  			<groupId>javax.servlet</groupId>
  			<artifactId>servlet-api</artifactId>
  			<version>2.5</version>
  		</dependency>

  		<dependency>
  			<groupId>commons-dbcp</groupId>
  			<artifactId>commons-dbcp</artifactId>
  			<version>1.4</version>
  		</dependency>

  		<dependency>
  			<groupId>mysql</groupId>
  			<artifactId>mysql-connector-java</artifactId>
  			<version>5.1.6</version>
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

---

# 学习  
  * web.xml及其他配置中/代表了webapp目录  
  * 配置中classpath:指/WEB-INF/classes/  
  * src/main/resources下的配置文件编译后在/WEB-INF/classes  
  * mysql的url配置，如果是本机而且使用默认端口可以不用配置ip及端口  
    直接jdbc:mysql:///springmvcdb

---

# 代码地址  
  * [SpringMVC_Mysql_Demo](https://github.com/anaer/SpringMVC_Mysql_Demo)  
    标签tag v1.0

---

# 参考  
  * [SpringMVC+Mysql实例详解 ](http://blog.csdn.net/tjcyjd/article/details/7492805)  
<!--
修改记录:
  2014-08-20:
    1. 新增文档

-->
