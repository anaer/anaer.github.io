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
  `/Mybatis_Generator/pom.xml`

  ```xml
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
  <!-- 使用java代码生成 -->
  <dependency>
   <groupId>org.mybatis.generator</groupId>
   <artifactId>mybatis-generator-core</artifactId>
   <version>1.3.2</version>
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

  修改版:
  mvn install 生成
  mvn clean   清理生成

  ```xml
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
      <!-- 使用java代码生成 -->
      <dependency>
        <groupId>org.mybatis.generator</groupId>
        <artifactId>mybatis-generator-core</artifactId>
        <version>1.3.2</version>
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
          <dependencies>
            <!-- 这里配置了依赖 generatorConfig.xml可以不用再配置, 不过为了方便java代码调用执行，所以留着 -->
            <dependency>
              <groupId>mysql</groupId>
              <artifactId>mysql-connector-java</artifactId>
              <version>5.1.32</version>
            </dependency>
          </dependencies>
          <configuration>
            <configurationFile>${basedir}/src/main/resources/generatorConfig.xml</configurationFile>
            <verbose>true</verbose>
            <overwrite>true</overwrite>
          </configuration>
          <executions>
            <execution>
              <id>Generate MyBatis Artifacts</id>
              <goals>
                <goal>generate</goal>
              </goals>
            </execution>
          </executions>
        </plugin>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-clean-plugin</artifactId>
          <version>2.5</version>
          <configuration>
            <filesets>
              <fileset>
                <directory>src/main/java/com</directory>
                <followSymlinks>false</followSymlinks>
                <useDefaultExcludes>true</useDefaultExcludes>
              </fileset>
              <fileset>
                <directory>src/main/resources/com</directory>
                <followSymlinks>false</followSymlinks>
                <useDefaultExcludes>true</useDefaultExcludes>
              </fileset>
            </filesets>
          </configuration>
        </plugin>
      </plugins>
      <pluginManagement>
        <plugins>
          <plugin>
            <groupId>org.eclipse.m2e</groupId>
            <artifactId>lifecycle-mapping</artifactId>
            <version>1.0.0</version>
            <configuration>
              <lifecycleMappingMetadata>
                <pluginExecutions>
                  <pluginExecution>
                    <pluginExecutionFilter>
                      <groupId>org.mybatis.generator</groupId>
                      <artifactId>mybatis-generator-maven-plugin</artifactId>
                      <versionRange>[1.3.2,)</versionRange>
                      <goals>
                        <goal>generate</goal>
                      </goals>
                    </pluginExecutionFilter>
                    <action>
                      <ignore></ignore>
                    </action>
                  </pluginExecution>
                </pluginExecutions>
              </lifecycleMappingMetadata>
            </configuration>
          </plugin>
        </plugins>
      </pluginManagement>
    </build>
  </project>
  ```

# 添加generatorConfig.xml
  `/Mybatis_Generator/src/main/resources/generatorConfig.xml`

  ```xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE generatorConfiguration PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN" "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd" >
  <generatorConfiguration>
   <classPathEntry
  location="D:\.m2\repository\mysql\mysql-connector-java\5.1.32\mysql-connector-java-5.1.32.jar" />

   <context id="mybatisDemoForMysql" targetRuntime="MyBatis3">
  <!-- 控制注释 -->
  <commentGenerator>
   <!-- 是否去除所有自动生成的注释文件 -->
   <property name="suppressAllComments" value="true" />
   <!-- 是否去除所有自动生成的文件的时间戳，默认为false -->
   <property name="suppressDate" value="true" />
  </commentGenerator>

  <!-- 数据库连接串 -->
  <jdbcConnection driverClass="com.mysql.jdbc.Driver"
   connectionURL="jdbc:mysql:///test?useUnicode=true&amp;characterEncoding=UTF-8" userId="root"
   password="password" />

  <javaTypeResolver>
   <!-- 把jdbc中的decimal与numberic类型转化为integer类型 -->
   <property name="forceBigDecimals" value="false" />
  </javaTypeResolver>


  <!-- 数据库表对应的model -->
  <javaModelGenerator targetPackage="com.model" targetProject="src\main\java">
   <property name="enableSubPackages" value="true" />
   <property name="trimStrings" value="true" />
  </javaModelGenerator>

  <!-- 控制Model的xmlMapper文件 -->
  <sqlMapGenerator targetPackage="com.persistence" targetProject="src\main\resources">
   <property name="enableSubPackages" value="true" />
  </sqlMapGenerator>

  <!-- 控制mapper接口 -->
  <javaClientGenerator targetPackage="com.persistence" targetProject="src\main\java"
   type="XMLMAPPER">
   <property name="enableSubPackages" value="true" />
   <property name="methodNameCalculator" value="extended" />
  </javaClientGenerator>

  <!-- schema你的数据库，tableName表名，domainObjectName对应你的javabean类名，是否生成相应的example -->
  <table schema="test" tableName="t_user" domainObjectName="User" enableCountByExample="false"
   enableUpdateByExample="false" enableDeleteByExample="false" enableSelectByExample="false"
   selectByExampleQueryId="false">
   <!-- 生成自增序列 -->
   <generatedKey column="id" sqlStatement="MySql" />
   <!-- 重定义字段名 -->
   <columnOverride column="uname" property="userName" />
   <!-- 过滤列 -->
   <ignoreColumn column="status" delimitedColumnName="false" />
  </table>
   </context>
  </generatorConfiguration>
  ```
# 生成代码
  * 在eclipse 中，选择pom.xml文件，击右键先择Run AS->Maven Build… ->在Goals框中输入：mybatis-generator:generate
  * 调用java代码执行生成
  `/Mybatis_Generator/src/main/java/Genetor.java`

  ```java
  import java.io.File;
  import java.io.IOException;
  import java.sql.SQLException;
  import java.util.ArrayList;
  import java.util.List;

  import org.mybatis.generator.api.MyBatisGenerator;
  import org.mybatis.generator.config.Configuration;
  import org.mybatis.generator.config.xml.ConfigurationParser;
  import org.mybatis.generator.exception.InvalidConfigurationException;
  import org.mybatis.generator.exception.XMLParserException;
  import org.mybatis.generator.internal.DefaultShellCallback;

  public class Genetor {
    public static void main(String[] args) {
    generateMbgConfiguration();

    }

    private static void generateMbgConfiguration() {
    /*
     * Mybatis自带Generator工具生成相应东西
     */
    List<String> warnings = new ArrayList<String>();
    boolean overwrite = true;
    File configFile = new File("src/main/resources/generatorConfig.xml");
    System.out.println(configFile.getAbsolutePath());
    if (!configFile.exists()) {
      System.out.println("配置文件不存在!");
      return;
    }
    ConfigurationParser cp = new ConfigurationParser(warnings);
    Configuration config = null;
    try {
      config = cp.parseConfiguration(configFile);
    } catch (IOException e) {
      e.printStackTrace();
    } catch (XMLParserException e) {
      e.printStackTrace();
    }
    DefaultShellCallback callback = new DefaultShellCallback(overwrite);
    try {
      MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
      myBatisGenerator.generate(null);
    } catch (InvalidConfigurationException e) {
      e.printStackTrace();
    } catch (SQLException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    System.out.println("生成Mybatis配置成功！");
    }
  }
  ```

### 参考
* [Mybatis Generator用户手册](http://generator.sturgeon.mopaas.com/reference/extending.html)
* [mybatis代码生成的几种方式](http://ljhzzyx.blog.163.com/blog/static/38380312201311133927394/)
* [修改mybatis-generator-1.3.2源码实现自定义代码生成详解](http://www.blogjava.net/bolo/archive/2015/03/20/423683.html)
