---
layout: post
title: "shell实用命令"
description: "shell实用命令"
category: shell
tags: [shell]

---

#### 查看机器的每个远程连接机器的连接数.md
    netstat -antu | awk '$5 ~ /[0-9]:/{split($5, a, ":"); ips[a[1]]++} END {for (ip in ips) print ips[ip], ip | "sort -k1 -nr"}'
#### 查看某个进程打开的socket数量
    ps aux | grep [process] | awk '{print $2}' | xargs -I % ls /proc/%/fd | wc -l
#### 查询当前日期
    DATE=$(date +%Y%m%d)
#### 打印第二列唯一值
    awk '{ a[$2]++ } END { for (b in a) { print b } }' file
#### 查看某个用户打开的文件句柄列表
    for x in `ps -u 500 u | grep java | awk '{ print $2 }'`;do ls /proc/$x/fd|wc -l;done

#### ls显示时按文件名数据序号排列
    ls -v
#### 查看无线网络的ip
    sudo ifconfig wlan0 | grep inet | awk 'NR==1 {print $2}' | cut -c 6-
#### 打印99乘法表
    seq 9 | sed 'H;g' | awk -v RS='' '{for(i=1;i<=NF;i++)printf("%dx%d=%d%s", i, NR, i*NR, i==NR?"\n":"\t")}'
#### 查找某个时间戳的文件列表
    cp -p `ls -l | awk '/Apr 14/ {print $NF}'` /usr/users/backup_dir
#### 计算文件temp的第一列的值的和
    awk '{s+=$1}END{print s}' temp

#### umask设置文件缺省模式
    umask
#### shell中需要转义的字符
    $ . ' " * [ ] ^ | ( ) \ + ?


#### shell流程控制
1. for循环
for project in $projects ; do
    echo $project
done
shell中变量自增的实现方法

#### bash中，目前有五种方法：
1. i=`expr $i + 1`;
2. let i+=1;
3. ((i++));
4. i=$[$i+1];
5. i=$(( $i + 1 ))

#### shell删除空格
1. 删除行首空格
  sed 's/^[ \t]*//g'

2. 删除行末空格
  sed 's/[ \t]*$//g'

3. 删除首尾空格
  sed -e 's/^[ \t]*//g' -e 's/[ \t]*$//g'

4. 删除所有的空格
  sed s/[[:space:]]//g

# 查看2到100所有质数
    for num in `seq 2 100`;do if [ `factor $num|awk '{print $2}'` == $num ];then echo -n "$num ";fi done;echo
# 查看机器的ip列表
    ifconfig -a | awk '/Bcast/{print $2}' | cut -c 5-19

#### 写脚本为文件头部添加日期
```sh
#!/usr/bin/sh
# 用法:
# adddate.sh README.MD
# 在README.MD文件头部添加两行，一行日期，一行分隔符
# 主要为了写备注用的
date >> tmp; echo ==== >> tmp; echo >> tmp; cat $1 >> tmp; cat tmp > $1 ; rm tmp;
```
