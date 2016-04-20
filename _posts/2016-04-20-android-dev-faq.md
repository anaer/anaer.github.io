---
layout: post
title: "Android开发常见问题"
description: ""
category: Android
tags: [ADT]
---

* you must restart adb and eclipse

关闭eclipse, 查询占用5037端口的进程并结束该进程, 重启eclipse.
netstat -aon|findstr "5037"
tasklist|findstr "2016"
