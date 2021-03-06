---
layout: post
title: "spring log4j配置说明"
description: "spring log4j配置说明"
category: java
tags: [log4j]
---

### spring项目添加log4j支持

#### 使用spring中的Log4jConfigListener有如如下好处：

1. 动态的改变记录级别和策略，不需要重启Web应用，如《Effective Enterprise Java》所说。
2. 把log文件定在 /WEB-INF/logs/ 而不需要写绝对路径。
    因为系统把web目录的路径压入一个叫webapp.root的系统变量。这样写log文件路径时不用写绝对路径了.
    log4j.appender.logfile.File=${webapp.root}/WEB-INF/logs/myfuse.log
3. 可以把log4j.properties和其他properties一起放在/WEB-INF/ ，而不是Class-Path。
4. log4jRefreshInterval为6000表示 开一条watchdog线程每6秒扫描一下配置文件的变化;

* web.xml添加log4j配置路径及监听器

```xml
<!--日志配置文件 -->
<context-param>
    <param-name>log4jConfigLocation</param-name>
    <param-value>/WEB-INF/conf/log4j.properties</param-value>
</context-param>

<context-param>
  <param-name>log4jRefreshInterval</param-name>
  <param-value>6000</param-value>
</context-param>

<listener>
    <listener-class>org.springframework.web.util.Log4jConfigListener</listener-class>
</listener>
```

* 添加log4j配置文件 log4j.properties

```
org.apache.commons.logging.Log=org.apache.commons.logging.impl.Log4JLogger
log4j.rootLogger=DEBUG, Console
log4j.appender.Console=org.apache.log4j.ConsoleAppender
log4j.appender.Console.layout=org.apache.log4j.PatternLayout
log4j.appender.Console.layout.ConversionPattern=%d [%t] %-5p [%c] - %m%n

log4j.logger.org.apache=INFO
log4j.logger.java.sql.ResultSet=INFO
log4j.logger.java.sql.Connection=DEBUG
log4j.logger.java.sql.Statement=DEBUG
log4j.logger.java.sql.PreparedStatement=DEBUG
```

* 添加jar包依赖 pom.xml

```xml
<!-- 日志记录 -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.7.5</version>
</dependency>
```

#### Log4j 如何实现 根据不同的类 或者不同的包 输出的调试信息到不同的文件夹中

在配置文件中按包名或类名来定义Logger
在程序中按类名取Logger

定义：

    log4j.rootLogger=debug,stdout
    log4j.logger.com.mypkg=debug,mypkg
    log4j.additivity.com.mypkg=false #表示不继承父logger, 即本例中日志只会输出到文件, 不会打印到控制台

    log4j.appender.stdout=org.apache.log4j.ConsoleAppender
    log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
    log4j.appender.stdout.layout.ConversionPattern=%5r [%5p][%c{2}] %m%n

    log4j.appender.mypkg=org.apache.log4j.RollingFileAppender
    log4j.appender.mypkg.File=system.log
    log4j.appender.mypkg.Append=true
    log4j.appender.mypkg.MaxFileSize=1MB
    log4j.appender.mypkg.MaxBackupIndex=1
    log4j.appender.mypkg.layout=org.apache.log4j.PatternLayout
    log4j.appender.mypkg.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} [%-5p][%c{1}] - %m%n

#### 格式参数

a)例句 ： log4j.appender.stdout.layout.ConversionPattern= [QC] %p [%t] %C.%M(%L) | %m%n
%m 输出代码中指定的消息
%p 输出优先级，即DEBUG，INFO，WARN，ERROR，FATAL
%r 输出自应用启动到输出该log信息耗费的毫秒数
%t 输出产生该日志事件的线程名
%n 输出一个回车换行符，Windows平台为“rn”，Unix平台为“n”
%d 输出日志时间点的日期或时间，默认格式为ISO8601，也可以在其后指定格式，比如：%d{yyyy MMM dd HH:mm:ss,SSS}，输出类似：2002年10月18日 22：10：28，921
%l 输出日志事件的发生位置，包括类目名、发生的线程，以及在代码中的行数。相当于%C%M(%F:%L)
%L 只输出在代码中的行数。
%c 输出所属的类目，通常就是所在类的全名。这个类名是你初始化logger的时候传给logger的类名，即category。若你初始化时的语句如下：private final Logger log = Logger.getLogger(LogTest.class);则%c所指示的类名为：LogTest。
%c{n} n表示显示的包路径层数，如%c显示：com.spring.login.test，则%c{1}显示:test。而%c{2}显示：login.test。
%C(c大写) 输出日志所属类目的调用者的全类名。此处输出的是调用logger的那个类的名字，比如你有一个类叫:LogCaller,而你在初始化logger是传给他的参数却是：LogTest.class。那么使用大写的%C后实际打出的类是调用类，即LogCaller。性能较差，不建议使用。
[QC]是log信息的开头，可以为任意字符，一般为项目简称。

b)不常用的几个：
%F 输出日志消息产生时所在的文件名称。性能不好，不建议使用
%M 输出日志消息产生时所在的方法名称。性能不好，不建议使用
%x 输出和当前线程相关联的NDC(nested diagnostic context)环境，用于多客户多线程的应用中
%X 输出和当前线程相关联的MDC(mapped diagnostic context)环境。

c)一些输出格式说明：
可以在%与模式字符之间加上修饰符来控制其最小宽度、最大宽度、和文本的对齐方式。如：
%20c：指定输出category的名称，最小的宽度是20，如果category的名称小于20的话，默认的情况下右对齐。
%-20c:指定输出category的名称，最小的宽度是20，如果category的名称小于20的话，”-”号指定左对齐。
%.30c:指定输出category的名称，最大的宽度是30，如果category的名称大于30的话，就会将左边多出的字符截掉，但小于30的话也不会有空格。
%20.30c:如果category的名称小于20就补空格，并且右对齐，如果其名称长于30字符，就从左边将多出的字符截掉。

#### RollingFileAppender选项

Threshold=DEBUG:指定日志消息的输出最低层次。
File=mylog.txt:指定消息输出到mylog.txt文件。
MaxFileSize=100KB: 后缀可以是KB, MB 或者是 GB. 在日志文件到达该大小时，将会自动滚动，即将原来的内容移到mylog.log.1文件。
MaxBackupIndex=2:指定可以产生的滚动文件的最大数。
ImmediateFlush=true:默认值是true,意谓着所有的消息都会被立即输出。
Append=false:默认值是true,即将消息增加到指定文件中，false指将消息覆盖指定的文件内容。

实例：
log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
log4j.appender.D.File = D:/work/test/test.log
log4j.appender.D.DatePattern='.'yyyy-MM-dd-HH-mm ##设置为每分钟产生一个日志文件
log4j.appender.D.Threshold = info ##设置该日志文件记录的日志级别为info及更高级
log4j.appender.D.layout = org.apache.log4j.PatternLayout
log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss} [ %t:%r ] - [ %p ]  %m%n
在DailyRollingFileAppender中可以指定monthly(每月)、 weekly(每周)、daily(每天)、half-daily(每半天)、hourly(每小时)和minutely(每分钟)六个频度，这是通过为 DatePattern选项赋予不同的值来完成的。DatePattern选项的有效值为：
   '.'yyyy-MM,对应monthly(每月)
   '.'yyyy-ww,对应weekly(每周)
   '.'yyyy-MM-dd,对应daily(每天)
   '.'yyyy-MM-dd-a,对应half-daily(每半天)
   '.'yyyy-MM-dd-HH,对应hourly(每小时)
   '.'yyyy-MM-dd-HH-mm,对应minutely(每分钟)

#### log4j配置模板

    log4j.rootLogger = INFO,CONSOLE, FILE
    log4j.appender.CONSOLE = org.apache.log4j.ConsoleAppender
    log4j.appender.CONSOLE.Threshold = INFO
    log4j.appender.CONSOLE.Target = System.out
    log4j.appender.CONSOLE.layout = org.apache.log4j.PatternLayout
    log4j.appender.CONSOLE.layout.ConversionPattern = [%-5p] [%l] %m%n
    #log4j.appender.CONSOLE.layout.ConversionPattern=[framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n

    log4j.appender.FILE = org.apache.log4j.FileAppender
    log4j.appender.FILE.File = log4j.log
    log4j.appender.FILE.Append = true
    log4j.appender.FILE.layout = org.apache.log4j.PatternLayout
    log4j.appender.FILE.layout.ConversionPattern = [%-5p] %-d{yyyy-MM-dd HH:mm:ss, SSS} - %c -%-4r [%t]  %c %x - %m%n

    log4j.appender.ROLLING_FILE = org.apache.log4j.RollingFileAppender
    log4j.appender.ROLLING_FILE.Threshold = ERROR
    log4j.appender.ROLLING_FILE.File = rolling.txt
    log4j.appender.ROLLING_FILE.Append = true
    log4j.appender.ROLLING_FILE.MaxFileSize = 100KB
    log4j.appender.ROLLING_FILE.MaxBackupIndex = 1
    log4j.appender.ROLLING_FILE.layout = org.apache.log4j.PatternLayout
    log4j.appender.ROLLING_FILE.layout.ConversionPattern = [framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n

    log4j.appender.Daily = org.apache.log4j.DailyRollingFileAppender
    log4j.appender.Daily.File = daily_log.txt
    log4j.appender.Daily.MaxFileSize = 500KB
    log4j.appender.Daily.MaxBackupIndex = 10
    log4j.appender.D.Append = true
    log4j.appender.D.Threshold = ERROR
    log4j.appender.Daily.layout = org.apache.log4j.PatternLayout
    log4j.appender.Daily.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss, SSS} [%t] [%c] [%p] - %m%n

#### rootLogger与rootCategory的区别

rootLogger是新的使用名称，对应Logger类
rootCategory是旧的使用名称，对应原来的Category类
Logger类是Category类的子类，所以，rootCategory是旧的用法，不推荐使用

### 参考
* [为什么要使用SLF4J而不是Log4J](http://www.importnew.com/7450.html)
* [Log4j 如何实现 根据不同的类 或者不同的包 输出的调试信息到不同的文件夹中](http://my.oschina.net/tinglanrmb32/blog/343215)
* [log4j日志分模块打印，同时不打印到控制台上](http://blog.csdn.net/xiamizy/article/details/38225919)
