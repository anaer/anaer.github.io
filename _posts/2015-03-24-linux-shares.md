---
layout: post
title: "linux 共享文件夹"
file: file
update: 22 Apr 2015
description: ""
category: category
tags: [tag]
--- 

在linux上共享文件夹windows下看
*******************************************
首先给linux设一个ip，要和windows是一个网段的
mkdir /share ---------------在根下创建文件夹(除了root的目录下不能创建其他都可以)
chmod 777 /share/ ------------给share文件夹赋权
vi /etc/samba/smb.conf ------------(编辑samba下的smb.conf文件)
编辑   security = share   ----------一般在第58行
编辑最后面的 286 [weihaiyang]
             287    comment = share
             288    path =/share
             289    valid users = nobody
             290    public = yes
             291    writable = yes
             292    printable = no
             293    create mask = 0765 （前面的数字是行数）

service smb restart 重启smb服务
然后在windows下的“运行”里输入linux的ip就OK了

