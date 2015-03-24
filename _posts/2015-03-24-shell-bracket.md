---
layout: post
title: "shell中括号处理"
file: 2015-03-24-shell-bracket.md
update: 2015-03-24 22:41
description: "shell中括号处理"
category:shell
tags: [shell]

---

### shell中单中括号和双中括号的区别
#### [

    [是一个可执行程序，路径是/usr/bin/[
    他与可执行程序test是等价的。

    例子：
    if [ 3 -eq 2 ] ; then
      echo "==";
    else
      echo "!=";
    fi;

    等价于：
    if /usr/bin/[ 3 -eq 2 ] ; then
      echo "==";
    else
    echo "!=";
    fi;

    等价于：
    if test 3 -eq 2 ; then
      echo "==";
    else
      echo "!=";
    fi;

#### [[

    [[是脚本解释程序(bash,sh等)的关键字
    例子：
    if [[ 2 == 2 ]] ; then
      echo "==";
    else
      echo "!=";
    fi;

    推荐使用“[[”。
