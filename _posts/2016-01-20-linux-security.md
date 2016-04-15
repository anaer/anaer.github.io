---
layout: post
title: "linux安全相关"
description: ""
category: linux
tags: [linux]
---

#### 用户查看
less /etc/passwd：查看是否有新增用户
grep :0 /etc/passwd：查看是否有特权用户（root权限用户）
ls -l /etc/passwd：查看passwd最后修改时间
awk -F: '$3==0 {print $1}' /etc/passwd：查看是否存在特权用户
awk -F: 'length($2)==0 {print $1}' /etc/shadow：查看是否存在空口令用户
注：linux设置空口令：passwd -d username

#### 进程查看
ps -aux：查看进程
lsof -p pid：查看进程所打开的端口及文件

检查隐藏进程
ps -ef | awk '{print }' | sort -n | uniq >1
ls /proc | sort -n |uniq >2
diff 1 2

#### 其他检查
* 检查文件
find / -uid 0 -print：查找特权用户文件
find / -size +10000k -print：查找大于10000k的文件
find / -name "..." -prin：查找用户名为...的文件
find / -name core -exec ls -l {} \;：查找core文件，并列出详细信息
md5sum -b filename：查看文件的md5值
rpm -qf /bin/ls：检查文件的完整性（还有其它/bin目录下的文件）

* 检查网络
ip link | grep PROMISC：正常网卡不应该存在promisc，如果存在可能有sniffer
lsof -i
netstat -nap：查看不正常端口
arp -a：查看arp记录是否正常

* 计划任务
crontab -u root -l：查看root用户的计划任务
cat /etc/crontab
ls -l /etc/cron.*：查看cron文件是变化的详细
ls /var/spool/cron/

* 检查后门
对于linux的后门检查，网络上有一些公开的工具，但是在不使用这些工具的前提时，我们可以通过一些命令来获取一些信息。

首先就是检测计划任务，可以参考上面；
第二：查看ssh永久链接文件：vim $HOME/.ssh/authorized_keys
第三：lsmod：检查内核模块
第四：chkconfig --list/systemctl list-units --type=service：检查自启
第五：服务后门/异常端口（是否存在shell反弹或监听）
其它：
ls /etc/rc.d
ls /etc/rc3.d

see http://drops.wooyun.org/%E8%BF%90%E7%BB%B4%E5%AE%89%E5%85%A8/11106
