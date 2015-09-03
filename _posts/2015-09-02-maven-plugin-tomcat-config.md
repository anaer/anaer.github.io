---
layout: post
title: "maven tomcat插件配置"
description: "maven tomcat插件配置"
category:maven
tags: [maven, tomcat]

---

#### pom.xml 中添加

```xml
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <url>http://localhost:8080/manager/text</url>
                    <server>tomcat</server>
                    <username>tomcat</username>
                    <password>tomcat</password>
                    <path>/myweb</path>
                    <update>true</update>
                </configuration>
            </plugin>
```

#### tomcat-users.xml

```xml
  <role rolename="tomcat"/>
  <role rolename="manager-gui"/>
  <role rolename="manager-script"/>
  <user username="tomcat" password="tomcat" roles="tomcat,manager-gui,manager-script"/>
```

#### 执行

```
mvn tomcat7:deploy
```
