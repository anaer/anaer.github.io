---
layout: post
title: "查看Linux版本系统信息方法汇总"
description: ""
category: Linux
tags: [Linux]
---

# 查看Linux版本系统信息方法汇总

  ```bash
  uname  -a                :查看当前操作系统内核信息
  cat  /etc/issue          :查看当前操作系统发行版信息
  cat  /proc/version       :查看当前操作系统版本信息
  cat  /proc/cpuinfo       :查看cpu相关信息，包括型号、主频、内核信息等
  getconf   LONG_BIT  	   :查看版本说明当前CPU运行在32bit模式下， 但不代表CPU不支持64bit
  lsb_release  -a          :查看系统描述 
  ```
