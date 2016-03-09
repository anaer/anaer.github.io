---
layout: post
title: "Eclipse控制台彩色输出"
description: ""
category: Eclipse
tags: [Eclipse]
---

#### 原理
核心就是让Eclipse的控制台支持ANSI Escape Color——一种国际标准，使用特定字符表示颜色。即让Eclipse的Console对表示颜色的特定字符进行转义（Escape），而不要直接输出。

#### 安装
Eclipse 插件市场 安装 Ansi Escape in Console 插件

#### 下载jar包, 添加工程依赖
[下载地址](https://github.com/mihnita/java-color-loggers/releases/download/v1.0.4.1/color-loggers-1.0.4.1.jar)

#### 修改log4j.properties配置

```
log4j.rootLogger=DEBUG,stdout

log4j.logger.java.sql=DEBUG,stdout

log4j.logger.com.ibatis=ERROR,stdout

log4j.appender.stdout=com.colorlog.log4j.AnsiColorConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.EnhancedPatternLayout
log4j.appender.stdout.layout.ConversionPattern=%-5p: %c{2} [%t] - %m%n

# You can change the default colors
# log4j.appender.CONSOLE.FatalColour={esc}[1;35m
# log4j.appender.CONSOLE.ErrorColour={esc}[0;31m
# log4j.appender.CONSOLE.WarnColour ={esc}[0;33m
# log4j.appender.CONSOLE.InfoColour ={esc}[1;32m
# log4j.appender.CONSOLE.DebugColour={esc}[1;36m
# log4j.appender.CONSOLE.TraceColour={esc}[1;30m
```

