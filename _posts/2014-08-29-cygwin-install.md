---
layout: post
title: "Cygwin下相关软件的安装"
description: ""
category: Cygwin
tags: [Cygwin]
---
 
#### Cygwin必装组件
 
* 1. git
* 2. vim
* 3. mysql
* 4. mysqld
* 5. tput 需要安装ncurses
* 6. zsh
* 7. svn
* 8. wget
  
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
