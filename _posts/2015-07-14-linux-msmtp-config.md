---
layout: post
title: "msmtp安装配置"
description: "msmtp安装配置"
category:msmtp
tags: [msmtp]

---

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
