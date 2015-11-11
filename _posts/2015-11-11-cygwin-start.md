---
layout: post
title: "cygwin安装部署"
description: ""
category: cygwin
tags: [cygwin]
---

1. 下载cygwin的安装程序setup-x86_64.exe
2. 安装, 包路径配置安装目录下setup目录
3. 初始安装wget, git, vim 三个程序
4. 安装完成后, 打开程序到/home目录, 执行`git clone https://github.com/anaer/root.git`, 克隆root工程
5. 执行`mkpasswd -l >　/etc/passwd`
   vim /etc/passwd, 设置当前用户Administrator的主目录为/home/root, 重启cygwin
6. 执行`git clone https://github.com/gmarik/vundle.git $HOME/.vim/bundle/vundle`
  vim中执行BundleInstall
7. 安装mysql, mysqld出问题, 启动不了, 装个windows版的服务器, cygwin上只安装客户端
8. 安装subversion
9. 安装screen
10. 安装cron


