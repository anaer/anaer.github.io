---
layout: post
title: "linux 磁盘映射"
description: ""
category: Linux
tags: [Linux]
--- 

http://blog.csdn.net/hs6823/article/details/8017177
假定需要被映射的源目录所在的机器为PC1:192.168.1.1
需要映射的机器为PC2:192.168.1.2

步骤如下：

1、以root身份登录到linux1服务器

2、修改编辑 /etc/exports 文件  命令： vi /etc/exports

       在exports中添加以下内容：

                       /home/work 192.168.1.*(rw,sync,no_root_squash)

       然后保存退出。

        以上内容表示：允许ip 地址范围在192.168.1.*的计算机以读写的权限来访问/home/work 目录。

       括号内的参数意义描述如下：

       rw：读/写权限，只读权限的参数为ro；

       sync：数据同步写入内存和硬盘，也可以使用async，此时数据会先暂存于内存中，而不立即写入硬盘。


        no_root_squash：nfs服务器共享目录用户的属性，如果用户是 root，那么对于这个共享目录来说就具有 root 的权限。

  

        接着执行如下命令，启动端口映射：

         /etc/rc.d/init.d/portmap start

        最后执行如下命令启动nfs服务，此时nfs 会激活守护进程，然后就开始监听 Client 端的请求：

         /etc/rc.d/init.d/nfs  start

3、以root身份登录到linux2服务器

4、执行以下命令进行挂载

       mount –t nfs 192.168.1.1:/home/work     /mnt

       以上命令说明如下：

       mount –t nfs 不解释。

       192.168.1.1:/home/work   被映射的linux1的IP和目录

        /mnt 目标liunx2的目录

5、ls /mnt  如果映射成功的情况下现在就可以看见linux1的/home/work 目录下的文件。

 以上就是全部映射的过程。感谢：http://server.zdnet.com.cn/server/2007/0831/482007.shtml

 

      取消挂载的命令是 umount /mnt
