---
layout: post
title: "日志查看工具OtrosLogVIewer"
description: ""
category: Java
tags: [Java]
---

### 相关链接

[下载地址](http://sourceforge.net/projects/otroslogviewer/files/)
[源码地址](http://otroslogviewer.googlecode.com/svn/trunk/)

### 使用说明
  * 默认下载下来的程序不支持带空格的目录, 如有需要, 需要修改启动批处理olv.bat
    修改启动语句，对于目录变量，用""包起来

    ```cmd
    start "OtrosLogViewer" /B %LOCAL_JAVA% %LOG_PROPERTIES% %MEMORY% -DOLV_HOME=%OLV_HOME% -DCURRENT_DIR=%CURRENT_DIR% -jar %OLV_HOME%\lib\OtrosStarter.jar %* 1>%OUT_FILE% 2>%ERR_FILE%
    ```
  * 中文支持需要修改配置文件olv-1.2.0\plugins\logimporters\log4j-1.pattern
    修改charset由UTF-8修改为GB2312
    可以自定义日志模式文件

### pattern配置

#### pattern例子
log4j日志格式:%d{ABSOLUTE} %5p %c - %m%n

plugins\logimporters\myweb.pattern:

```
type=log4j
pattern=TIMESTAMP  LEVEL CLASS - MESSAGE
dateFormat=HH:mm:ss,SSS
name="myweb"
charset=UTF-8
```

#### pattern关键字

* TIMESTAMP
* LOGGER
* LEVEL
* THREAD
* CLASS
* FILE
* LINE
* METHOD
* RELATIVETIME
* MESSAGE
* NDC
* PROP(key)
* 不支持的内容可以使用*忽略

#### 实例

配置说明:
[Log4jPatternMultilineLogParser.java](https://searchcode.com/codesearch/view/14064322/#)
[VFSLogFilepatternReceiver](http://logging.apache.org/chainsaw/apidocs/org/apache/log4j/chainsaw/vfs/VFSLogFilePatternReceiver.html)

log4j  :%d %-5p [%t] %C{2} (%F:%L) - %m%n
pattern:TIMESTAMP LEVEL [THREAD] CLASS (FILE:LINE) - MESSAGE

log4j  :%r [%t] %-5p %c %x - %m%n
pattern:PROP(RELATIVETIME) [THREAD] LEVEL LOGGER * - MESSAGE

### 参考
  * [推荐一个查看日志文件的工具OtrosLogVIewer](http://blog.sina.com.cn/s/blog_53b3dc830101a62t.html)
