---
layout: post
title: ""
file: 2015-03-24-shell-script.md
update: 2015-03-24 21:58
description: ""
category:
tags: []

---

#### 查看机器的每个远程连接机器的连接数.md
    netstat -antu | awk '$5 ~ /[0-9]:/{split($5, a, ":"); ips[a[1]]++} END {for (ip in ips) print ips[ip], ip | "sort -k1 -nr"}'
#### 查看某个进程打开的socket数量
    ps aux | grep [process] | awk '{print $2}' | xargs -I % ls /proc/%/fd | wc -l
#### 查询当前日期
    DATE=$(date +%Y%m%d)
# 打印第二列唯一值
    awk '{ a[$2]++ } END { for (b in a) { print b } }' file
# 查看某个用户打开的文件句柄列表
    for x in `ps -u 500 u | grep java | awk '{ print $2 }'`;do ls /proc/$x/fd|wc -l;done
# 判断文件/目录是否存在
    if [ ! -x "$myPath" ]; then   
      mkdir "$myPath"    
    fi   

常用参数说明：
-x 判断$myPath是否存在并且是否具有可执行权限 
-d 判断目录是否存在
-f 判断文件是否存在
-n 判断变量是否有值

详细参数说明：
-a file exists. 
-b file exists and is a block special file. 
-c file exists and is a character special file. 
-d file exists and is a directory. 
-e file exists (just the same as -a). 
-f file exists and is a regular file. 
-g file exists and has its setgid(2) bit set. 
-G file exists and has the same group ID as this process. 
-k file exists and has its sticky bit set. 
-L file exists and is a symbolic link. 
-n string length is not zero. 
-o Named option is set on. 
-O file exists and is owned by the user ID of this process. 
-p file exists and is a first in, first out (FIFO) special file or 
named pipe. 
-r file exists and is readable by the current process. 
-s file exists and has a size greater than zero. 
-S file exists and is a socket. 
-t file descriptor number fildes is open and associated with a 
terminal device. 
-u file exists and has its setuid(2) bit set. 
-w file exists and is writable by the current process. 
-x file exists and is executable by the current process. 
-z string length is zero. 

#### ls显示时按文件名数据序号排列
    ls -v
# 查看无线网络的ip
    sudo ifconfig wlan0 | grep inet | awk 'NR==1 {print $2}' | cut -c 6-
# 打印99乘法表
    seq 9 | sed 'H;g' | awk -v RS='' '{for(i=1;i<=NF;i++)printf("%dx%d=%d%s", i, NR, i*NR, i==NR?"\n":"\t")}'
# 查找某个时间戳的文件列表
    cp -p `ls -l | awk '/Apr 14/ {print $NF}'` /usr/users/backup_dir
# 计算文件temp的第一列的值的和
    awk '{s+=$1}END{print s}' temp

#### umask设置文件缺省模式
    umask
#### shell中需要转义的字符
    $ . ' " * [ ] ^ | ( ) \ + ? 
#### 获取文件名和扩展名
basename example.tar.gz .tar.gz
# => example

FILE="example.tar.gz"

echo "${FILE%%.*}"
# => example

echo "${FILE%.*}"
# => example.tar

echo "${FILE#*.}"
# => tar.gz

echo "${FILE##*.}"
# => gz

# 在bash中可以这么写
filename=$(basename "$fullfile")
extension="${filename##*.}"
filename="${filename%.*}"
     
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

    