---
layout: post
title: "Linux中邮件发送功能"
description: "Linux邮件发送功能"
category: Linux
tags: [Linux, Email]
---

### email程序
* email安装
    执行`apt-cyg install email`命令安装email程序.

* email帮助
    使用`man email`命令查看email帮助信息.

* email命令介绍

```
Options information is as follows
email [options] recipient1,recipient2,...

    -h, -help module          Print this message or specify one of the below options
    -V, -verbose              Display mailing progress.
    -f, -from-addr            Senders mail address[发件人地址]
    -n, -from-name            Senders name[发件人名称]
    -b, -blank-mail           Allows you to send a blank email[是否允许发送空邮件]
    -e, -encrypt              Encrypt the e-mail for first recipient before sending
    -s, -subject subject      Subject of message[邮件主题]
    -r, -smtp-server server   Specify a temporary SMTP server for sending[邮件发送服务器]
    -p, -smtp-port port       Specify the SMTP port to connect to[邮件发送端口]
    -a, -attach file          Attach file and base64 encode[添加附件]
    -c, -conf-file file       Path to non-default configuration file[配置文件路径, 默认配置文件:/etc/email/email.conf]
    -t, -check-config         Simply parse the email.conf file for errors[检查email.conf配置文件是否有误]
    -x, -timeout              Set socket timeout.[设置超时时间]
        -cc email,email,...   Copy recipients
        -bcc email,email,...  Blind Copy recipients
        -sign                 Sign the email with GPG
        -html                 Send message in HTML format ( Make your own HTML! )
        -tls                  Use TLS/SSL
    -m, -smtp-auth type       Set the SMTP AUTH type (plain or login)[权限校验类型]
    -u, -smtp-user username   Specify your username for SMTP AUTH[发件人帐号]
    -i, -smtp-pass password   Specify your password for SMTP AUTH[发件人密码]
    -g, -gpg-pass             Specify your password for GPG
    -H, -header string        Add header (can be used multiple times)
        -high-priority        Send the email with high priority
        -no-encoding          Don't use UTF-8 encoding
```

* email发送邮件
  1. 可以直接执行email命令发送邮件, 将所有参数信息带上.
    `email a._-0@139.com -f f_test@163.com -n f_test -s test -r smtp.163.com -p 25 -u f_test@163.com -i tgplgllxlgmptxdx -m login -a apt-cyg`

  2. 使用email.conf配置文件, 将相关的服务器信息配置到email.conf配置文件后
    `email a._-0@139.com -s 'send mail test'`
