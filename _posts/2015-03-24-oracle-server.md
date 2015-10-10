---
layout: post
title: "oracle 服务介绍"
description: ""
category: Oracle
tags: [Oracle]
---

Oracle 11g服务详细介绍
按照windows 7 64位 安装oracle 11g R2中的方法成功安装Oracle 11g后，共有7个服务，这七个服务的含义分别为：

1. Oracle ORCL VSS Writer Service：Oracle卷映射拷贝写入服务，VSS（Volume Shadow Copy Service）能够让存储基础设备（比如磁盘，阵列等）创建高保真的时间点映像，即映射拷贝（shadow copy）。它可以在多卷或者单个卷上创建映射拷贝，同时不会影响到系统的系统能。（非必须启动）

2. OracleDBConsoleorcl：Oracle数据库控制台服务，orcl是Oracle的实例标识，默认的实例为orcl。在运行Enterprise Manager（企业管理器OEM）的时候，需要启动这个服务。（非必须启动）

3. OracleJobSchedulerORCL：Oracle作业调度（定时器）服务，ORCL是Oracle实例标识。（非必须启动）

4. OracleMTSRecoveryService：服务端控制。该服务允许数据库充当一个微软事务服务器MTS、COM/COM+对象和分布式环境下的事务的资源管理器。（非必须启动）

5. OracleOraDb11g_home1ClrAgent：Oracle数据库.NET扩展服务的一部分。 （非必须启动）

6. OracleOraDb11g_home1TNSListener：监听器服务，服务只有在数据库需要远程访问的时候才需要。（非必须启动，下面会有详细详解）。

7. OracleServiceORCL：数据库服务(数据库实例)，是Oracle核心服务该服务，是数据库启动的基础， 只有该服务启动，Oracle数据库才能正常启动。(必须启动)

那么在开发的时候到底需要启动哪些服务呢？

对新手来说，要是只用Oracle自带的sql*plus的话，只要启动OracleServiceORCL即可，要是使用PL/SQL Developer等第三方工具的话，OracleOraDb11g_home1TNSListener服务也要开启。OracleDBConsoleorcl是进入基于web的EM必须开启的，其余服务很少用。

注：ORCL是数据库实例名，默认的数据库是ORCL，你可以创建其他的，即OracleService+数据库名。
