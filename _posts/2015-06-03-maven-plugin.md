---
layout: post
title: "maven插件配置"
description: "maven插件配置"
category: maven
tags: [maven]
---

#### Maven插件

* 配置编译使用的jdk版本

```xml
<plugin>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.1</version>
    <configuration>
        <source>1.6</source>
        <target>1.6</target>
        <encoding>UTF-8</encoding>
    </configuration>
</plugin>
```

* 编译war包配置

```xml
<plugin>
    <artifactId>maven-war-plugin</artifactId>
    <version>2.4</version>
    <configuration>
        <failOnMissingWebXml>false</failOnMissingWebXml>
        <!-- 默认src/main/webapp -->
        <webResources>
            <resource>
                <directory>webApp</directory>
            </resource>
        </webResources>
    </configuration>
</plugin>
```

* 单元测试配置

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <skip>true</skip>
        <testFailureIgnore>true</testFailureIgnore>
        <includes>
            <include>**/*Test.java</include>
            <include>**/*TestCase.java</include>
            <include>**/Test*.java</include>
        </includes>
        <excludes>
            <exclude>**/Abstract*.java</exclude>
        </excludes>
    </configuration>
</plugin>
```

