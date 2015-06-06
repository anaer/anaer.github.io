---
layout: post
title: "Linux下的msmtp发送邮件"
description: ""
category: Linux
tags: [Linux]

---

### 安装
    `apg-cyg install msmtp`

### 配置
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

### 使用说明
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

### 常见问题
#### msmtp: cannot use a secure authentication method
.msmtprc 配置中
auth 设置为login, 设置为on时，会提示上面这个错

#### msmtp: authentication failed (method LOGIN)
msmtp: server message: 550 User is locked

邮箱设置未启动smtp

#### msmtp: the server did not accept the mail
msmtp: server message: 554 DT:SPM smtp13, EcCowADHPI5ro3FVs1k0Aw--.23S2 1433510769 http://mail.163.com/help/help_spam_16.htm?ip=183.128.217.108&hostid=smtp13&time=1433510769

邮件内容不规范, 缺少标题subject之类的必要信息，被邮箱服务器作为垃圾邮件，拒绝发送了