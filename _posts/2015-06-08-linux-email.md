---
layout: post
title: "Linux中邮件发送功能"
description: "Linux邮件发送功能"
category: Linux
tags: [Linux, Email]

---

### Cygwin下发送邮件程序

* email
* msmtp

#### email程序
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

### msmtp
#### msmtp安装
    `apg-cyg install msmtp`

#### msmtp配置
    163邮箱使用客户端授权密码, 所以在password项配置的是客户端授权密码, 而不是登录密码.

.msmtprc
```
defaults
account f_test
host smtp.163.com
port 25
from f_test@163.com
auth login
user f_test@163.com
password tgplgllxlgmptxdx
tls off
account default : f_test
logfile /home/root/.msmtp.log
```

#### msmtp使用说明
* 在命令行, 可以直接`msmtp 收件人`, 回车之后再输入`subject:标题`, 标题是必须的, 再换行输入to收件人及邮件正文,最后Ctrl+D结束编辑进行发送

```
[9:18 1175 ~ ] %msmtp xxx@aliyun.com
subject:命令行邮件
to:xxx@aliyun.com

正文
[9:19 1176 ~ ] %
```

```sh
msmtp ${USER_MAIL} <<END
subject:[Git] ${msg}
to:${USER_MAIL}

${preCommit}

END
```

详细点的例子, 这个我是放在.git/hooks/commit-msg中, 作为邮件通知的
```sh
msmtp -d ${USER_MAIL} <<END
to:${USER_MAIL}
subject:[Git] ${comment}
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary=frontier
# 支持多部分内容, 如下面所示 一个作为正文内容, 一个作为附件

This is a message with multiple parts in MIME format.
--frontier
Content-Type: text/plain;

${message}

PS. 如果日志文件太大, 正文中只显示100行信息, 完整信息请查看附件.
--frontier
Content-Type: text/plain;
content-disposition: attachment; filename="detail.txt"
# 这个附件的意思是将下面的内容作为附件, filename为附件的名字, 一直搞错了 以为是将本地文件作为附件

${fullmessage}
--frontier--
END
```

#### msmtp常见问题
#### msmtp: cannot use a secure authentication method
.msmtprc 配置中
auth 设置为login, 设置为on时，会提示上面这个错

#### msmtp: authentication failed (method LOGIN)
msmtp: server message: 550 User is locked

邮箱设置未启动smtp

#### msmtp: the server did not accept the mail
msmtp: server message: 554 DT:SPM smtp13, EcCowADHPI5ro3FVs1k0Aw--.23S2 1433510769 http://mail.163.com/help/help_spam_16.htm?ip=183.128.217.108&hostid=smtp13&time=1433510769

邮件内容不规范, 缺少标题subject之类的必要信息，被邮箱服务器作为垃圾邮件，拒绝发送了
