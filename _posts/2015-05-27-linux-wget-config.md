---
layout: post
title: "linux wget程序"
description: ""
category: linux
tags: [linux, wget]

---

### wget代理设置

在~/.wgetrc中设定代理

    http_proxy = http://ip_or_domainname:80/
    ftp_proxy = http://ip_or_domainname:80/
    use_proxy = on
    wait = 15

然后直接wget http://ip/filename就ok了
