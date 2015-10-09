---
layout: post
title: "J2EE开发框架学习"
description: ""
category: Java
tags: [Java]
---

# 环境搭建
  * 项目下载地址：http://pan.baidu.com/s/1sjPSxtj
  * memcached下载: http://download.csdn.net/detail/ideputy/7850455
  * Mysql数据库

#  框架使用到的Java技术：
  1. springmvc4 spring4
  2. orm使用hibernate4
  3. 安全框架使用shiro
  4. 数据源使用druid
  5. 整个框架使用maven管理
  6. 缓存可以使用memcached，ehcached
  7. 日志使用slf4j+log4j

# 目录结构
  * 解压下载的代码, Eclipse导入现有Maven工程
  * 为了方便代码阅读将hqhop-framework重命名为hqhop-framework,同时更新pom.xml文件
  * hqhop-framework-common 整个框架公用模块
  * hqhop-framework-plugin 完成报表打印，上传下载，验证码等功能
  * hqhop-framework-shiro  使用shiro安全框架，完成用户登录，系统权限控制等
  * hqhop-framework-web    项目的web层，是一个web项目


# 参考
  * [J2EE开发框架搭建目录 ](http://blog.csdn.net/asdewq380303318/article/details/38978295)
