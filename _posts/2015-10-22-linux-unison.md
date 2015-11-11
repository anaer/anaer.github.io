---
layout: post
title: "unison双向同步"
description: "unison双向同步"
category: linux
tags: [linux, unison]
---

#### unison简介
Unison是Windows、Linux以及其他Unix平台下都可以使用的文件同步工具，它能使两个文件夹（本地或网络上的）保持内容的一致。
Unison拥有与其它一些同步工具或文件系统的相同的特性，但也有自身的特点：
1.跨平台使用；
2.对内核和用户权限没有特别要求；
3.Unison是双向的，它能自动处理两分拷贝中更新没有冲突的部分，有冲突的部分将会显示出来让用户选择更新策略；
4.只要是能连通的两台主机，就可以运行unison，可以直接使用socket连接或安全的ssh连接方式，对带宽的要求不高，使用类似rsync的压缩传输协议。

#### unison安装
直接查找unison的最新版本进行安装即可.
Cygwin下安装:

`apt-cyg find unison`
`apt-cyg install unison2.48`

#### unison配置

```
# Unison preferences file
root = /home/root/.yong/
root = /cygdrive/d/yong/.yong/
# force表示会以本地所指定文件夹为标准，将该目录同步到远端。
#force =
# prefer表示有冲突时, 以哪边的文件为主
prefer = /cygdrive/d/yong/.yong/
# 忽略指定目录，即同步时不同步它。
#ignore =
# 全自动模式，接受缺省动作，并执行。
batch = true
#repeat = 1
#retry = 3
owner = true
group = true
perms = -1
# true 表示同步时仅通过文件的创建时间来比较，如果选项为false，Unison则将比较两地文件的内容。
fastcheck = false
rsync = false
sshargs = -C
xferbycopying = true
log = true
logfile = /home/root/.unison/unison.log
```

#### unison配置文件参数信息
详细参数看帮助手册

```
-auto //接受缺省的动作，然后等待用户确认是否执行。
-batch //batch mode, 全自动模式，接受缺省动作，并执行。
-ignore xxx //增加 xxx 到忽略列表中
-ignorecase [true|false|default] //是否忽略文件名大小写
-follow xxx //是否支持对符号连接指向内容的同步
owner = true //保持同步过来的文件属主
group = true //保持同步过来的文件组信息
perms = -1 //保持同步过来的文件读写权限
repeat = 1 //间隔1秒后,开始新的一次同步检查
retry = 3 //失败重试
sshargs = -C //使用ssh的压缩传输方式
xferbycopying = true"
-immutable xxx //不变目录，扫描时可以忽略
-silent //安静模式
-times //同步修改时间
-path xxx 参数 //只同步 -path 参数指定的子目录以及文件，而非整个目录，-path 可以多次出现。
```

#### 相关链接
* [ Linux下实现文件双向同步 ](http://hx100.blog.51cto.com/44326/612301/)

