---
layout: post
title: "Maven添加war包依赖"
description: ""
category: Maven
tags: [Maven]
---

#### maven中添加war包依赖

  ```xml
  <project>
  <build>
    <!-- To define the plugin version in your parent POM -->
    <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.appfuse.plugins</groupId>
                    <artifactId>maven-warpath-plugin</artifactId>
                    <version>2.2.2-SNAPSHOT</version>
                </plugin>
            </plugins>
        </pluginManagement>
    <!-- To use the plugin goals in your POM or parent POM -->
    <plugins>
      <plugin>
           <groupId>org.appfuse</groupId>
                <artifactId>maven-warpath-plugin</artifactId>
                <version>2.0.2</version>
                <extensions>true</extensions>
                <executions>
                    <execution>
                        <goals>
                            <goal>add-classes</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
    </plugins>
  </build>
  </project>
  ```

  通常会再添加以下配置将war包中的lib包过滤掉:

  ```xml
  <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-war-plugin</artifactId>
    <configuration>
        <dependentWarExcludes>WEB-INF/lib/*</dependentWarExcludes>
    </configuration>
  </plugin>
  ```

  添加war包依赖

  ```xml
  <dependency>
     <groupId>cn.kingsoft</groupId>
     <artifactId>game-web</artifactId>
     <version>1.0</version>
     <type>warpath</type>
   </dependency>
  ```
