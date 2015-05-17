---
layout: post
title: "数据库导入导出"
description: ""
category: category
tags: [tag]
---

#### 数据泵导入
    导出：
    expdp scott/tiger directory=dumpdir dumpfile=scott.dmp


    导入：
    10G的 IMPDP 可以，TABLE_EXISTS_ACTION
    共有4个选项，SKIP,APPEND,TRUNCATE,REPLACE
    如：
    impdp username/password directory=DUMP DUMPFILE=TEST.DMP
    TABLE_EXISTS_ACTION=TRUNCATE
    默认是SKIP,也就是当表存在时，跳过不处理
    APPEND表示在已经存在的表追加记录
    TRUNCATE表示删除已存在的表的所以记录，然后导入新的记录
    replace表示删除已经存在的表，然后建表，再导入数据
    TRUNCATE不能用于聚簇表

