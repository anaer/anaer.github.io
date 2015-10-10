---
layout: post
title: "maven jetty 插件配置"
description: "maven jetty 插件配置"
category: maven
tags: [maven, jetty]
---

#### jetty插件配置

```xml
<plugin>
    <groupId>org.eclipse.jetty</groupId>
    <artifactId>jetty-maven-plugin</artifactId>
    <version>9.3.3.v20150827</version>
    <configuration>
        <scanIntervalSeconds>10</scanIntervalSeconds>
        <webApp>
            <contextPath>/myweb</contextPath>
        </webApp>
    </configuration>
</plugin>
```

### 参考
* [jetty插件配置说明](http://www.eclipse.org/jetty/documentation/current/jetty-maven-plugin.html)
