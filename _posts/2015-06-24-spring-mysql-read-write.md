---
layout: post
title: "Spring mysql读写分离"
description: "Spring mysql读写分离"
category:Spring
tags: [Spring, mysql]
---

### Spring 实现数据库读写分离
  借助于Spring框架提供的AbstractRoutingDataSource可以实现动态的选择数据源datasource

  * 新建Catalog DAO对象

  ```java
  /**
  /Spring_Mysql_ReadWrite_Demo/src/main/java/blog/datasource/Catalog.java
   */
  package blog.datasource;

  import java.sql.ResultSet;
  import java.sql.SQLException;
  import java.util.List;

  import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
  import org.springframework.jdbc.core.simple.SimpleJdbcDaoSupport;

  @SuppressWarnings("deprecation")
  public class Catalog extends SimpleJdbcDaoSupport {

    public List<Item> getItems() {
    String query = "select name, price from item";
    return getSimpleJdbcTemplate().query(query, new ParameterizedRowMapper<Item>() {
      @Override
      public Item mapRow(ResultSet rs, int row) throws SQLException {
      String name = rs.getString(1);
      double price = rs.getDouble(2);
      return new Item(name, price);
      }
    });
    }
  }
  ```

  * 新增item对象

  ```java
  /**
  /Spring_Mysql_ReadWrite_Demo/src/main/java/blog/datasource/Item.java
   */
  package blog.datasource;

import java.util.List;

import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

public class CatalogTests extends AbstractDependencyInjectionSpringContextTests {

    private Catalog catalog;

    public void setCatalog(Catalog catalog) {
  this.catalog = catalog;
    }

    public void testDataSourceRouting() {
  CustomerContextHolder.setCustomerType(CustomerType.GOLD);
  List<Item> goldItems = catalog.getItems();
  assertEquals(3, goldItems.size());
  System.out.println("gold items: " + goldItems);

  CustomerContextHolder.setCustomerType(CustomerType.SILVER);
  List<Item> silverItems = catalog.getItems();
  assertEquals(2, silverItems.size());
  System.out.println("silver items: " + silverItems);

  CustomerContextHolder.clearCustomerType();
  List<Item> bronzeItems = catalog.getItems();
  assertEquals(1, bronzeItems.size());
  System.out.println("bronze items: " + bronzeItems);
    }

    @Override
    protected String[] getConfigLocations() {
  return new String[] { "/blog/datasource/beans.xml" };
    }
}
  ```

  * 配置beans.xml
  配置Spring多数据源，共同继承一个父数据源

  ```xml
  <!--
  /Spring_Mysql_ReadWrite_Demo/src/main/resources/blog/datasource/beans.xml
  -->

  <?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
  http://www.springframework.org/schema/beans/spring-beans-2.5.xsd">

<bean id="parentDataSource"
         class="org.springframework.jdbc.datasource.DriverManagerDataSource"
         abstract="true">
   <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
   <property name="username" value="root"/>
   <property name="password" value="password"/>
</bean>

<bean id="goldDataSource" parent="parentDataSource">
   <property name="url" value="jdbc:mysql://localhost:${db.port.gold}/test"/>
</bean>

<bean id="silverDataSource" parent="parentDataSource">
   <property name="url" value="jdbc:mysql://localhost:${db.port.silver}/test"/>
</bean>

<bean id="bronzeDataSource" parent="parentDataSource">
   <property name="url" value="jdbc:mysql://localhost:${db.port.bronze}/test"/>
</bean>

<bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
   <property name="location" value="classpath:/blog/datasource/db.properties"/>
</bean>


<bean id="catalog" class="blog.datasource.Catalog">
   <property name="dataSource" ref="dataSource"/>
</bean>

<bean id="dataSource" class="blog.datasource.CustomerRoutingDataSource">
   <property name="targetDataSources">
      <map key-type="blog.datasource.CustomerType">
         <entry key="GOLD" value-ref="goldDataSource"/>
         <entry key="SILVER" value-ref="silverDataSource"/>
      </map>
   </property>
   <property name="defaultTargetDataSource" ref="bronzeDataSource"/>
</bean>
</beans>
  ```

  ```
  #/Spring_Mysql_ReadWrite_Demo/src/main/resources/blog/datasource/db.properties
  db.port.gold=3306
db.port.silver=3307
db.port.bronze=3308
  ```

  * 新建DataSource
          新建一个datasource继承自AbstractRoutingDataSource，并且覆盖determineCurrentLookupKey()方法，每次用这个datasource获取数据库连接的时候都会回调这个方法获得key，根据返回的字符串key（也可以是枚举值，数字类型），动态地通过datasource配置的id来在Spring的配置文件中找到相应的datasource来获取connection（见代码4）。那么如果每次访问都需要根据key来决定如何选择数据源，那么这个key必须要保证线程安全，并发情况下每个线程都会去寻找本应该属于自己的key获取数据源，所以CustomerContextHolder类中就用到了ThreadLocal来保证

  ```java
  /**
  /Spring_Mysql_ReadWrite_Demo/src/main/java/blog/datasource/CustomerRoutingDataSource.java
  */
  package blog.datasource;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class CustomerRoutingDataSource extends AbstractRoutingDataSource {

    @Override
    protected Object determineCurrentLookupKey() {
  return CustomerContextHolder.getCustomerType();
    }
}
  ```


  ```java
  package blog.datasource;
import org.springframework.util.Assert;

public class CustomerContextHolder {

    private static final ThreadLocal<CustomerType> contextHolder = new ThreadLocal<CustomerType>();

    public static void setCustomerType(CustomerType customerType) {
  Assert.notNull(customerType, "customerType cannot be null");
  contextHolder.set(customerType);
    }

    public static CustomerType getCustomerType() {
  return (CustomerType) contextHolder.get();
    }

    public static void clearCustomerType() {
  contextHolder.remove();
    }
}
  ```

  ```java
  package blog.datasource;
public enum CustomerType {
    BRONZE, SILVER, GOLD
}
  ```


  * 测试类

  ```java
  package blog.datasource;

import java.util.List;

import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

public class CatalogTests extends AbstractDependencyInjectionSpringContextTests {

    private Catalog catalog;

    public void setCatalog(Catalog catalog) {
  this.catalog = catalog;
    }

    public void testDataSourceRouting() {
  CustomerContextHolder.setCustomerType(CustomerType.GOLD);
  List<Item> goldItems = catalog.getItems();
  assertEquals(3, goldItems.size());
  System.out.println("gold items: " + goldItems);

  CustomerContextHolder.setCustomerType(CustomerType.SILVER);
  List<Item> silverItems = catalog.getItems();
  assertEquals(2, silverItems.size());
  System.out.println("silver items: " + silverItems);

  CustomerContextHolder.clearCustomerType();
  List<Item> bronzeItems = catalog.getItems();
  assertEquals(1, bronzeItems.size());
  System.out.println("bronze items: " + bronzeItems);
    }

    @Override
    protected String[] getConfigLocations() {
  return new String[] { "/blog/datasource/beans.xml" };
    }
}
  ```


  * Maven依赖配置

  ```xml
  <!-- /Spring_Mysql_ReadWrite_Demo/pom.xml -->

  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>Spring_Mysql_ReadWrite_Demo</groupId>
  <artifactId>Spring_Mysql_ReadWrite_Demo</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>jar</packaging>
  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-mock</artifactId>
      <version>1.2.6</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>4.0.4.RELEASE</version>
    </dependency>

    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>5.1.32</version>
    </dependency>
  </dependencies>

  <build>
    <sourceDirectory>src</sourceDirectory>
    <plugins>
      <plugin>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.1</version>
        <configuration>
          <source>1.6</source>
          <target>1.6</target>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
  ```

  * 代码地址
  https://github.com/anaer/Spring_Mysql_ReadWrite_Demo  tag: v1.0

### 参考
* [Dynamic Datasource Routing](http://spring.io/blog/2007/01/23/dynamic-datasource-routing)
* [Spring实现数据库读写分离](http://neoremind.net/2011/06/spring实现数据库读写分离/)
