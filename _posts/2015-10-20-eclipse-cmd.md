---
layout: post
title: "如何在Eclipse中使用命令行"
description: ""
category: eclipse
tags: [eclipse]
---

1. Run -> External Tools -> External Tools Configurations
2. New Program
3. Main标签页:
   Name: Command_Prompt
   Location: C:\Windows\System32\cmd.exe
   Working Directory: C:\
   工作目录可以使用变量如:${project_loc}, 指定当前工程目录
4. Common标签页:
   Allocate Console 打勾
5. Run执行, 即可在控制台中打开命令行

#### 相关链接
* [如何在 Eclipse 中使用命令行](http://www.oschina.net/question/28_46291)
