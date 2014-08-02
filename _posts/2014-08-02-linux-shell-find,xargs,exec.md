---
layout: post
title: "Linux Shell find,xargs,exec-查找技巧"
description: ""
category: Linux
tags: [Linux, Shell, find, xargs, exec]
---
### 命令格式: find pathname -options [-print -exec -ok]

    参数
        pathname: find命令所查找的目录路径。例如用.来表示当前目录，用/来表示系统根目录。
        -print：     find命令将匹配的文件输出到标准输出。
        -exec：     find命令对匹配的文件执行该参数所给出的shell命令。相应命令的形式为'command' {} /;，注意{ }和/；之间的空格。
        -ok：       和-exec的作用相同，只不过以一种更为安全的模式来执行该参数所给出的shell命令，在执行每一个命令之前，都会给出提示，让用户来确定是否执行。

### find命令选项

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


### find

    当前目录及子目录中查找文件名以一个大写字母开头的文件
            find . -name "[A-Z]*" -print

    在/etc目录中查找文件名以host开头的文件
            find /etc -name "host*" -print


### exec

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


### xargs

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

 

### 案例：

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
