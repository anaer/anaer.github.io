---
layout: post
title: "velocity常见问题"
description: "velocity常见问题"
category:Velocity
tags: [Velocity]
---

#### 在使用velocity过程中，总是出现.ResourceNotFoundException异常，找不到模板.vm文件

    设置模板路径
    properties.setProperty(Velocity.FILE_RESOURCE_LOADER_PATH, basePath);


### velocity遇到的问题及分析

使用情况：

        使用了webmvc框架，框架里集成了velocity模板引擎，但是在使用时没有配置velocity.properties日志配置文件。

现象：

        使用jenkins发布后应用一直不能正常启动（tomcat端口已经监听），具体错误信息如下：

错误信息：

        jenkins发布后的错误信息：

        java.lang.NoClassDefFoundError: Could not initialize class
        xx.webmvc.views.Render
        xx.webmvc.servlet.DispatcherServlet.process(DispatcherServlet.java:120)
        xx.webmvc.servlet.FrameworkServlet.doGet(FrameworkServlet.java:68)
        javax.servlet.http.HttpServlet.service(HttpServlet.java:617)
        javax.servlet.http.HttpServlet.service(HttpServlet.java:717)


        通过人工启动的错误信息：

        java.io.FileNotFoundException: velocity.log (Permission denied)
        java.io.FileOutputStream.openAppend(Native Method)
        java.io.FileOutputStream.<init>(FileOutputStream.java:177)
        java.io.FileOutputStream.<init>(FileOutputStream.java:102)
        org.apache.log4j.FileAppender.setFile(FileAppender.java:294)
        org.apache.log4j.RollingFileAppender.setFile(RollingFileAppender.java:207)
        org.apache.log4j.FileAppender.<init>(FileAppender.java:110)
        org.apache.log4j.RollingFileAppender.<init>(RollingFileAppender.java:79)
        org.apache.velocity.runtime.log.Log4JLogChute.initAppender(Log4JLogChute.java:118)
        org.apache.velocity.runtime.log.Log4JLogChute.init(Log4JLogChute.java:85)
        org.apache.velocity.runtime.log.LogManager.createLogChute(LogManager.java:157)
        org.apache.velocity.runtime.log.LogManager.updateLog(LogManager.java:269)
        org.apache.velocity.runtime.RuntimeInstance.initializeLog(RuntimeInstance.java:871)
        org.apache.velocity.runtime.RuntimeInstance.init(RuntimeInstance.java:262)
        org.apache.velocity.runtime.RuntimeInstance.init(RuntimeInstance.java:646)
        org.apache.velocity.app.VelocityEngine.init(VelocityEngine.java:116)
        javax.servlet.http.HttpServlet.service(HttpServlet.java:617)
        javax.servlet.http.HttpServlet.service(HttpServlet.java:717)



问题原因:

        velocity的日志框架导致（velocity是使用自己封装的日志框架记录日志的），velocity在初始化Logger时，如果没有读取到配置文件，则会使用默认的velocity.log做为文件输出路径，源代码里使用了 File file = new File("velocity.log") 代码片段,这样创建的文件目录是在启动jvm进程的用户目录下（也就是user.dir属性）。

解决办法：

        1、添加一个velocity.properties日志配置文件
        2、修改velocity的代码，把日志转接到应用里使用的日志框架上来。
        解决的方式是直接关闭Velocity日志。
        3/在调用 Velocity.init(); 之前
        设置：
        Velocity.setProperty(VelocityEngine.RUNTIME_LOG_LOGSYSTEM_CLASS, "org.apache.velocity.runtime.log.NullLogChute");

