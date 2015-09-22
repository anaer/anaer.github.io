---
layout: post
title: "Cygwin安装配置"
description: "Cygwin安装配置"
category: Cygwin
tags: [Cygwin]
---

#### Cygwin必装组件

* vim
* git
* svn
* mysql
* mysqld
* tput 需要安装ncurses
* zsh
* wget
* email
* screen
* tmux 比screen多一个状态栏
* cron
* task

### 安装说明
#### 安装nodejs

```bash
$ wget http://nodejs.org/dist/node-v0.4.5.tar.gz
$ tar -xvf node-v0.4.5.tar.gz
$ cd node-v0.4.5
$ ./configure
$ make install
$ node -v
```

### 参考
* [win7下cygwin+nodeJs的安装 ](http://blog.csdn.net/xiaokaibupabupa/article/details/6890869)
