---
layout: post
title: "用Maven插件生成Mybatis代码"
description: ""
category: Maven
tags: [Maven, Mybatis]
---

# 创建普通Java工程
  工程名:Mybatis_Generator
  包路径:src/main/java; src/main/resources

# 添加Maven支持
  工程右键菜单configure->Convert to Maven Project...

# 添加Maven配置pom.xml

  ```xml
  <!-- /Mybatis_Generator/pom.xml -->
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>Mybatis_Generator</groupId>
	<artifactId>Mybatis_Generator</artifactId>
	<version>0.0.1-SNAPSHOT</version>

	<dependencies>
		<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis</artifactId>
			<version>3.2.7</version>
		</dependency>
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>5.1.32</version>
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
				<groupId>org.mybatis.generator</groupId>
				<artifactId>mybatis-generator-maven-plugin</artifactId>
				<version>1.3.2</version>
				<configuration>
					<verbose>true</verbose>
					<overwrite>true</overwrite>
				</configuration>
			</plugin>
		</plugins>
	</build>
  </project>
  ```

# 添加generatorConfig.xml

  ```xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE generatorConfiguration PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN" "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd" >
  <generatorConfiguration>
	  <classPathEntry location="D:\.m2\repository\mysql\mysql-connector-java\5.1.32\mysql-connector-java-5.1.32.jar" />
	  <context id="context1" targetRuntime="MyBatis3">
		  <jdbcConnection driverClass="com.mysql.jdbc.Driver"
			  connectionURL="jdbc:mysql:///nta?useUnicode=true&amp;characterEncoding=UTF-8"
			  userId="root" password="password" />
		  <javaModelGenerator targetPackage="xxx.account.model"
			  targetProject="src\main\java" />
		  <sqlMapGenerator targetPackage="xxxx.account.persistence"
			  targetProject="src\main\resources" />
		  <javaClientGenerator targetPackage="xxxx.account.persistence"
			  targetProject="src\main\java" type="XMLMAPPER" />
		  <table schema="CL_DEMO" tableName="oper_op_log" />
	  </context>
  </generatorConfiguration>
  ```

# 代码地址
  https://github.com/anaer/Mybatis_Generator

# 参考  
  * [用Maven插件生成Mybatis代码](http://blog.csdn.net/gufeng672/article/details/27196347)
