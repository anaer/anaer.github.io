---
layout: post
title: "light应用开发环境部署"
description: "light应用开发环境部署"
category: light
tags: [light]
---

1. 下载安装nodejs
2. 创建安装light的目标目录, 如f:\light
3. 打开命令行窗口, 使用cd命令切换目录到f:\light
4. 执行`npm install jresplus -dg`安装light应用
    如果安装报错, 提示无法连接之类的错误信息, 执行下面的命令
    `npm config set registry http://registry.npmjs.org/`
5. `light -v`检查安装的light版本
6. `light server`启动light服务
    默认端口3000
