---
layout: post
title: "msmtp常见问题"
description: "msmtp常见问题"
category: msmtp
tags: [msmtp]
---

#### msmtp: cannot use a secure authentication method

```
.msmtprc 配置中
auth 设置为login, 设置为on时，会提示上面这个错
```

#### msmtp: authentication failed (method LOGIN)

```
msmtp: server message: 550 User is locked
邮箱设置未启动smtp
```

#### msmtp: the server did not accept the mail

```
msmtp: server message: 554 DT:SPM smtp13, EcCowADHPI5ro3FVs1k0Aw--.23S2 1433510769 http://mail.163.com/help/help_spam_16.htm?ip=183.128.217.108&hostid=smtp13&time=1433510769
邮件内容不规范, 缺少标题subject之类的必要信息，被邮箱服务器作为垃圾邮件，拒绝发送了
```

#### ~/.msmtprc: must have no more than user read/write permissions

```
修改文件权限, 只保留当前用户只读权限
chmod og-rwx .msmtprc
chmod u-wx .msmtprc
```
