---
layout: post
title: "maven生成jar插件"
description: "maven生成jar插件"
category: maven
tags: [maven]
---

* pom.xml添加配置

```xml
<plugin>
    <!-- mvn assembly:assembly -->
    <artifactId>maven-assembly-plugin</artifactId>
    <configuration>
        <archive>
            <manifest>
                <mainClass>mystock.Client</mainClass>
            </manifest>
        </archive>
        <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
    </configuration>
</plugin>
```

* 执行命令`mvn assembly:assembly`
