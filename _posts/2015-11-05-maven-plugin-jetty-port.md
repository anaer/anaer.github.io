---
layout: post
title: "maven插件 jetty端口配置"
description: ""
category: maven
tags: [maven, jetty]
---

1. 通过命令行, 在启动jetty的时候配置:
  `mvn -Djetty.port=9090 jetty:run`

2. 在maven的pom文件中进行配置

```
<plugin>
        <groupId>org.mortbay.jetty</groupId>
        <artifactId>maven-jetty-plugin</artifactId>
        <version>6.1.26</version>
        <configuration>
            <scanIntervalSeconds>3</scanIntervalSeconds>
            <connectors>
                <connector implementation="org.mortbay.jetty.nio.SelectChannelConnector">
                    <port>10086</port>
                </connector>
            </connectors>
            <scanTargetPatterns>
                <scanTargetPattern>
                    <directory>src/main/webapp/WEB-INF</directory>
                    <excludes>
                        <exclude>**/*.jsp</exclude>
                    </excludes>
                    <includes>
                        <include>**/*.properties</include>
                        <include>**/*.xml</include>
                    </includes>
                </scanTargetPattern>
            </scanTargetPatterns>
        </configuration>
```

3. 还是maven的pom文件中配置

```
    <configuration>
        <httpConnector>
                <port>9090</port>
        </httpConnector>
    </configuration>
```
