---
layout: post
title: "Linux的awk命令用法"
description: "Linux的awk命令用法"
category: Linux
tags: [Linux]
---

#### 字符串分隔, 根据:分隔, 并打印第二项
    echo 123:456|awk -F ':' '{print $2}'
    结果:456

#### 过滤显示以version开头的行
    cat desc |awk '/^version/ {print $0}'

#### 删除temp文件的重复行
    awk '!($0 in array) { array[$0]; print }' temp

#### 查看最常使用的10个unix命令
    awk '{print $1}' ~/.bash_history | sort | uniq -c | sort -rn | head -n 10

#### 查看最常使用的10个unix命令 并且显示百分比
    history | awk '{CMD[$2]++;count++;} END { for (a in CMD )print CMD[ a ]" " CMD[ a ]/count*100 "% " a }' | grep -v "./" | column -c3 -s " " -t |sort -nr | nl | head -n10

#### 逆序查看文件
    awk '{a[i++]=$0} END {for (j=i-1; j>=0;) print a[j--] }'

#### 查看第3到第6行
    awk 'NR >= 3 && NR <= 6' /path/to/file

#### 查看系统所有分区
    awk '{if ($NF ~ "^[a-zA-Z].*[0-9]$" && $NF !~ "c[0-9]+d[0-9]+$" && $NF !~ "^loop.*") print "/dev/"$NF}'  /proc/partitions

#### 打印文件第一列不同值的行
    awk '!array[$1]++' file.txt

#### 查看输入数据的特定位置的单个字符
    echo "abcdefg"|awk 'BEGIN {FS="''"} {print $2}'
    ls | awk '{print NR "\t" $0}'

#### 查看最常用的命令和使用次数
    history | awk '{if ($2 == "sudo") a[$3]++; else a[$2]++}END{for(i in a){print a[i] " " i}}' |  sort -rn | head

#### 打印当前的ssh 客户端
    netstat -tn | awk '($4 ~ /:22\s*/) && ($6 ~ /^EST/) {print substr($5, 0, index($5,":"))}'

#### 打印行号
    ls | awk '{print NR "\t" $0}'

#### 格式化输出当前的进程信息
    ps -ef | awk -v OFS="\n" '{ for (i=8;i<=NF;i++) line = (line ? line FS : "") $i; print NR ":", $1, $2, $7, line, ""; line = "" }'
