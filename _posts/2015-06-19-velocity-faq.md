---
layout: post
title: "velocity常见问题"
description: "velocity常见问题"
category:Velocity
tags: [Velocity]

---

#### 在使用velocity过程中，总是出现.ResourceNotFoundException异常，找不到模板.vm文件
    设置模板路径
    properties.setProperty(Velocity.FILE_RESOURCE_LOADER_PATH, basePath); 
