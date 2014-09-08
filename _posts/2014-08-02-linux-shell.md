---
layout: post
title: "Linux Shell命令"
description: ""
category: Linux
tags: [Linux, Shell]
---
# 命令格式: find pathname -options [-print -exec -ok]

    参数
        pathname: find命令所查找的目录路径。例如用.来表示当前目录，用/来表示系统根目录。
        -print：     find命令将匹配的文件输出到标准输出。
        -exec：     find命令对匹配的文件执行该参数所给出的shell命令。相应命令的形式为'command' {} /;，注意{ }和/；之间的空格。
        -ok：       和-exec的作用相同，只不过以一种更为安全的模式来执行该参数所给出的shell命令，在执行每一个命令之前，都会给出提示，让用户来确定是否执行。

# find命令选项

        -name：按照文件名查找文件。
        -perm：按照文件权限来查找文件。
        -prune：使用这一选项可以使find命令不在当前指定的目录中查找，如果同时使用-depth选项，那么-prune将被find命令忽略。
        -user： 按照文件属主来查找文件。
        -group：按照文件所属的组来查找文件。

        -mtime -n +n：按照文件的更改时间来查找文件， - n表示文件更改时间距现在n天以内，+n表示文件更改时间距现在n天以前。Find命令还有-atime和-ctime选项，但它们都和-mtime选项。

        -nogroup：查找无有效所属组的文件，即该文件所属的组在/etc/groups中不存在。
        -nouser：查找无有效属主的文件，即该文件的属主在/etc/passwd中不存在。

        -newer file1 ! file2：查找更改时间比文件file1新但比文件file2旧的文件
        -type 查找某一类型的文件
                b - 块设备文件。
                d - 目录。
                c - 字符设备文件。
                p - 管道文件。
                l - 符号链接文件。
                f - 普通文件
        -size n：[c] 查找文件长度为n块的文件，带有c时表示文件长度以字节计。
        -depth：在查找文件时，首先查找当前目录中的文件，然后再在其子目录中查找。
        -fstype：查找位于某一类型文件系统中的文件，这些文件系统类型通常可以在配置文件/etc/fstab中找到，该配置文件中包含了本系统中有关文件系统的信息
                -mount：在查找文件时不跨越文件系统mount点。
                -follow：如果find命令遇到符号链接文件，就跟踪至链接所指向的文件。
                -cpio：对匹配的文件使用cpio命令，将这些文件备份到磁带设备中


# find

    当前目录及子目录中查找文件名以一个大写字母开头的文件
            find . -name "[A-Z]*" -print

    在/etc目录中查找文件名以host开头的文件
            find /etc -name "host*" -print


# exec

    find命令将所有匹配到的文件一起传递给exec执行
    有些系统对能够传递给exec的命令长度有限制，这样在find命令运行几分钟之后，就会出现溢出错误
    xargs命令每次只获取一部分文件而不是全部

    匹配当前目录下的所有普通文件
            find . -type f -exec ls -l {} /;

    在/ logs目录中查找更改时间在5日以前的文件并删除它们
            find logs -type f -mtime +5 -exec rm {} /;

    在当前目录中查找所有文件名以.log结尾、更改时间在5日以上的文件，并删除它们，在删除之前先给出提示
            find . -name "*.log" -mtime +5 -ok rm {} /;

    首先匹配所有文件名为“ passwd*”的文件，然后执行grep命令查看这些文件中是否存在一个sam用户
            find /etc -name "passwd*" -exec grep "sam" {} /;

    查找当前用户主目录下的所有文件
            find $HOME -print
            find ~ -print

    在当前目录中文件属主具有读、写权限，并且文件所属组的用户和其他用户具有读权限的文件
            find . -type f -perm 644 -exec ls -l {} /;

    查找系统中所有文件长度为0的普通文件，并列出它们的完整路径
            find / -type f -size 0 -exec ls -l {} /;

    查找系统中所有属于root组的文件
            find . -group root -exec ls -l {} /;

    查找当前目录中的所有目录并排序
            find . -type d |sort


# xargs

    前面的输出转换为后方指令的参数输入
    使用exec和xargs可以使用户对所匹配到的文件执行几乎所有的命令。

    查找系统中的每一个普通文件，然后使用xargs命令测试它们分别属于哪类文件
        find . -type f -print | xargs file

    在整个系统中查找内存信息转储文件(core dump) ，然后把结果保存到/tmp/core.log 文件中
        find / -name "core" -print | xargs echo "" >/tmp/core.log

    在当前目录下查找所有用户具有读、写和执行权限的文件，并收回相应的写权限
        find . -perm -7 -print | xargs chmod o-w

    用grep命令在所有的普通文件中搜索hostname这个词
        find . -type f -print | xargs grep "hostname"

    统计当前目录下所有文件的大小,含子目录,精确到字节
        find ./ -type f | xargs ls -l | awk 'BEGIN{size=0}{size+=$5};END{print size}'

 

# 案例：

* 将当前目录下1小时内修改过的文件 移到/tmp下

        #!/bin/bash
        for i in `find . -mmin -60 |awk 'NR>1 {print $0}'`
                do
                        echo "cp $i to /tmp"
                        cp $i /tmp
                done;


* find删除.svn目录

        find ./ -name '.svn' -print0 | xargs -0 rm -rf
        -print0 与默认的-print相比，输出的序列不是以空格分隔，而是以null字符分隔
        xargs -0 可以接受以null而非空格间隔的输入流

* find重命名 改成*.bak

        find . -name "*.vim" -exec mv {} {}.bak \;
* 重命名*.wiki文件为*.md

        find . -name "*.wiki" -exec rename .wiki .md {} \;

* 对.jpg图片文件名添加序号

        find . -name '*.jpg' | awk 'BEGIN{ a=0 }{ printf "mv %s name%01d.jpg\n", $0, a++ }' | bash

# shell 判断字符串是否存在包含关系

  ```bash
  #! /bin/bash

  var1="hello"
  var2="he"

## 方法1
  if [ ${var1:0:2} = $var2 ]
  then
	  echo "1:include"
  fi

## 方法2
  echo "$var1" |grep -q "$var2"
  if [ $? -eq 0 ]
  then
	  echo "2:include"
  fi

## 方法3
  echo "$var1" |grep -q "$var2" && echo "include" ||echo "not"

## 方法4
  [[ "${var1/$var2/}" != "$var2" ]] && echo "include" || echo "not"

## 其他方法：

  expr或awk的index函数
  ${var#...}                 
  ${var%...}
  ${var/.../...}
  ```


# Sed常见用法总结
编辑文本 
sed -i '1i xyz' test.txt 在第一行之前
sed -i '1a xyz' test.txt  在第一行之后插入
sed -i '1c xyz' test.txt  把第一行数据替换成xyz


sed '/^bb/i\kjdlfkjdslkf' temp.txt  //在匹配的行之前加入新一行
sed '/^bb/a\kjdlfkjdslkf' temp.txt  //在匹配的行之后加入新行
 sed -n '/xxx/w temp.txt' temp1.txt //temp1.txt中匹配xxx的行插入到temp.txt
sed '/xx/c\sdfdsf' temp.txt //用新的一行数据替换匹配xx的行


sed '1d' t.txt  /删除文件第一行
sed '/bro/d' t.txt  //删除带bro的行  (实际修改,删除等加-i)
sed '/^$/d' t.txt //删除空行


sed 's/^.*uid//' t.txt  //将uid前这段字符替换成空,^第一个字符不能为*,要加.，另外在sed里字符与*连接要加. 
sed 's/night/NIGHT/' 1.TXT //将night替换  (加 -i 直接修改源文件1.txt,而不是将替换后的数据输出到屏幕)
sed 's/night/NIGHT/g' 1.TXT  替换所有,不加g一行只替换一次
sed 's/.html//' b.txt >b0.txt


sed 'y/bo/BO/' test.txt  //将b替换成B,o替换成O
sed 'y/bb ll/BB LL/' test.txt  //将bb替换成BB，ll替换成LL


查询文本


sed '/he/w test1.txt' test.txt   //读取test.txt内容匹配he的行写入test1.txt
sed '1,2w test1.txt' test.txt    //读取test.txt内容，第一二行写入test1.txt
sed '/he/r test1.txt' test.txt //读取test.txt内容匹配he的行与test1.txt所有内容合并后输出
 
sed -n '1,3p' getrow.sh   //显示一行到三行的肉容
sed -n '1,/hello/'p  orig.txt //从第一行开始打印，打印到第一个含有hello行
//n的作用是取消默认输出 只打印包含模板的行,缺省为打印所有行(编辑和未编辑)


sed -n '$p' getrow.sh   //最后一行
sed -n '/echo/'p while.sh  //打印包括echo字符的行 /pattern/模式
sed -e '/echo/=' while.sh  //并且打印行号(并且整个文件都打印) -n 只打印实际行号  打印行号使用=
sed -n -e '/dfs.support.append/=' hdfs-default.xml
sed -n  -e '/we/p' -e '/we/=' 2.txt  //只打印匹配的行,并行显示行号 
sed -n  '/aa/='  aa.txt  //只显示匹配上的行号


sed -n '/^h/'p test.txt //显示h为开头的行
sed '/^hello/d' test.txt  //查询非某某开头的写法


sed -n '/s\{2,\}/'p test.txt //s字符至少匹配两次
sed -n '/[0-9]\{1,\}/'p test.txt //包含数字的行，用[0-9]+不支持


sed '2q' test.txt  //打印到第二行退出


需要注意的是，sed并不直接操作初始数据，它操作的是一份原始数据的拷贝。sed处理时，把当前处理的行存储在临时缓冲区中，然后处理缓冲区中的内容，处理完成后，如果没有重定向到文件， 将把缓冲区中的内容送往屏幕，接着处理下一行直到处理完毕

# 参考 
  * [shell 判断字符串是否存在包含关系](http://www.blogjava.net/xzclog/archive/2011/03/04/345712.html)
  * [sed常见用法总结](http://blog.csdn.net/u011750989/article/details/39005831)
