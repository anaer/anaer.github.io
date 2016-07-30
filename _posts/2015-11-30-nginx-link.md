---
layout: post
title: "nginx 相关链接"
description: ""
category: nginx
tags: [nginx]
---

* post请求文件内容, 会报 405 Method not allowed,
  重定向 405 错误码到 200

        location /test {
            alias /home/nginx/test/;
            error_page 405 =200 $uri;
        }


* [nginx启动、重启、关闭](http://www.cnblogs.com/jianxie/p/3990377.html)

