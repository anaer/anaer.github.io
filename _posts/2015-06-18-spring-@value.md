---
layout: post
title: "Spring的@Value注解"
description: "Spring的@Value注解"
category:Spring
tags: [Spring]
---

#### @Value介绍
  使用@Value来给字段赋初值
  @Value在Spring 3.0之后提供

#### 用法
1. `#{expression?:default value}`

```java
@Value("#{systemProperties['mongodb.port'] ?: 27017}")
private String mongodbPort;

@Value("#{config['mongodb.url'] ?: '127.0.0.1'}")
private String mongodbUrl;

@Value("#{aBean.age ?: 21}")
private int age;
```

2. @Value和配置文件
`${property:default value}`

```java
//@PropertySource("classpath:/config.properties}")
//@Configuration

@Value("${mongodb.url:127.0.0.1}")
private String mongodbUrl;

@Value("#{'${mongodb.url:172.0.0.1}'}")
private String mongodbUrl;

@Value("#{config['mongodb.url']?:'127.0.0.1'}")
private String mongodbUrl;
```

```
#config.properties
mongodb.url=1.2.3.4
mongodb.db=hello
```

在spring配置文件中添加
```xml
xmlns:util="http://www.springframework.org/schema/util"

http://www.springframework.org/schema/util
http://www.springframework.org/schema/util/spring-util-3.0.xsd

<util:properties id="config" location="classpath:config.properties"/>
```

如果要使用${}必须先在配置文件中配置或者使用注解注册PropertySourcesPlaceholderConfigurer

```java
//@PropertySource("classpath:/config.properties}")
//@Configuration

@Bean
public static PropertySourcesPlaceholderConfigurer propertyConfigIn() {
    return new PropertySourcesPlaceholderConfigurer();
}
```

### 参考
* [Spring @Value default value](http://www.mkyong.com/spring3/spring-value-default-value/)
