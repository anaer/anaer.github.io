---
layout: post
title: "oracle faq"
description: ""
category: Oracle
tags: [Oracle]
---

#### ORA-12541 TNS无监听程序
    将tnsnames.ora,listener.ora中的host名称改为计算机名
#### ORA-12638 身份证明检索失败
    可能是加入域的原因
    1). 修改sqlnet.ora 中的
    SQLNET.AUTHENTICATION_SERVICES=(NONE)
    2). 注释掉
    #SQLNET.AUTHENTICATION_SERVICES

#### ORA-27101 shared memory realm does not exist
    数据库未启动
    $ sqlplus /nolog
    SQL> connect sys/admin as sysdba
    SQL> startup

#### Oracle监听器服务无法启动
    在本地计算机无法启动OracleOraHome92TNSListener服务，错误3，系统找不到指定路径
    进入注册表,
    HKEY_LOCAL_MACHINE/SYSTEM/CurrentControlSet/Services/OracleOraHome92TNSListener,查看是否存在ImagePath关键值,如果没有,新建它.类型是可扩充字符串值,他的值(我机器)为: "D:/oracle/ora92/bin/TNSLSNR.EXE"
