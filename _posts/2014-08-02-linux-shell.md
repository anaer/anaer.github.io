---
layout: post
title: "Linux Shell命令"
file: 2014-08-02-linux-shell.md
update: 2014-10-30 10:56
tags: [Linux, Shell]
---

# find命令
## 命令格式: 

	find pathname -options [-print -exec -ok]
    参数
        pathname: find命令所查找的目录路径。例如用.来表示当前目录，用/来表示系统根目录。
        -print：     find命令将匹配的文件输出到标准输出。
        -exec：     find命令对匹配的文件执行该参数所给出的shell命令。相应命令的形式为'command' {} /;，注意{ }和/；之间的空格。
        -ok：       和-exec的作用相同，只不过以一种更为安全的模式来执行该参数所给出的shell命令，在执行每一个命令之前，都会给出提示，让用户来确定是否执行。

## find命令选项

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


## find实例

  ```bash
  find . -name "[A-Z]*" -print  # 当前目录及子目录中查找文件名以一个大写字母开头的文件
  find /etc -name "host*" -print  # 在/etc目录中查找文件名以host开头的文件
  find ./ -name "*.log" -type f  # 找到文件后缀为.log的文件, 注意:一定要有引号
  find . -perm 755 -print       # 找到权限为755的文件
  find ./ -user poe –print # 找到用户为poe的文件
  find /apps -group gem –print
  find / -mtime -5 –print #在系统根目录下查找更改时间在5日以内的文件
  find /var/adm -mtime +3 –print # 在/var/adm目录下查找更改时间在3日以前的文件
  find /usr/sam -path "/usr/sam/dir1" -prune -o –print # 在/usr/sam目录下查找不在dir1子目录之内的所有文件
  find . -maxdepth 1 -name "*.zip" -print # 只在的文件
  find . -perm 755 -exec ls {} \; ##执行命令, 注意;和{}之间的空格
  ```
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

```
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
```

# Shell脚本Debug

  ```bash
  #!/bin/sh -xv
  ```


# Shell脚本实现include

很简单, 用source：

  ```bash
  #!/bin/bash

  echo "Begin to call another script..."

  source /path/to/another/script.sh #其中的变量在caller中依然有效

  echo "Done"
  ```

# stat命令
  查询文件/目录统计信息
  stat filename

# sort命令

  ```bash
  sort a.txt # 文件内容排序
  sort -n b.txt # 排序数字类型
  sort -t'#' -k 2 -n count.txt # -t命令指定分隔符，-k命令指定按第几列排序，-n代表排序数字。  如: 中国#23  
  sort -n -r b.txt  # -r 降序排序
  ```

# tar/zip/xz压缩解压命令

  ```bash
	[root@linux ~]# tar -cvf /tmp/etc.tar /etc <==仅打包，不压缩！  
    [root@linux ~]# tar -zcvf /tmp/etc.tar.gz /etc <==打包后，以 gzip 压缩  
    [root@linux ~]# tar -jcvf /tmp/etc.tar.bz2 /etc <==打包后，以 bzip2 压缩  

	# 查看压缩包内容
	unzip -v large.zip  
	tar -tf xx.tar


	# xz解压文件
	xd -d *.tar.xz
  ```

# 文件扩展名

  ```
  file="thisfile.txt"  
  echo "filename: ${file%.*}" # 文件名 
  echo "extension: ${file##*.}" # 扩展名 
  ```

# Shell 调试
  
  ```bash
  sh -x somefile.sh
  ```

# tput彩色输出
  
  ```bash
  tput Color Capabilities:

  tput setab [0-7] – Set a background color using ANSI escape
  tput setb [0-7] – Set a background color
  tput setaf [0-7] – Set a foreground color using ANSI escape
  tput setf [0-7] – Set a foreground color

  Color Code for tput:

  0 – Black
  1 – Red
  2 – Green
  3 – Yellow
  4 – Blue
  5 – Magenta
  6 – Cyan
  7 – White

  tput Text Mode Capabilities:

  tput bold – Set bold mode
  tput dim – turn on half-bright mode
  tput smul – begin underline mode
  tput rmul – exit underline mode
  tput rev – Turn on reverse mode
  tput smso – Enter standout mode (bold on rxvt)
  tput rmso – Exit standout mode
  tput sgr0 – Turn off all attributes
  ```

  ```bash
  # 彩色输出
  function put(){
    color1=$((RANDOM%8))
    color2=$((RANDOM%8))
    echo $(tput setaf ${color1}; tput setab ${color2}; tput bold)$*$(tput sgr0)

  ```

# 随机数

  ```
  echo $(($RANDOM%100))
  echo $((`head /dev/urandom|cksum|awk '{print $2}'`%100))
  echo $((`date +%N`%100))
  ```


# Cygwin安装库
  * default
  * zsh
  * svn
  * git
  * vim
  * tput 需要安装ncurses


# ZSH安装
  * 使用Cygwin的setup.exe搜索zsh下载安装
  * 修改/etc/passwd，修改用户的启动shell为zsh
  * 复制.bashrc为.zshrc, 因为zsh兼容bash的配置
  * 路径自动补全功能 
  
  尝试在cygwin上安装后，响应很慢


# wget代理设置

  ```bash
   在~/.wgetrc中设定代理
   http_proxy = http://ip_or_domainname:80/
   ftp_proxy = http://ip_or_domainname:80/
   use_proxy = on
   wait = 15

   然后直接wget http://ip/filename就ok了
  ```
 
# scp ssh上传下载文件

  ```Bash
  下载
  scp -r root@10.139.102.xxx:/root/auto_fdisk.sh ./auto_fdisk.sh

  上传
  scp test.md root@10.139.102.xxx:/root/
  ```

# sshpass 
  安装sshpass

  ```Bash
  # 需要安装gcc 和 make
  wget http://sourceforge.net/projects/sshpass/files/sshpass/1.05/sshpass-1.05.tar.gz
  tar zxvf sshpass-1.05.tar.gz
  cd sshpass-1.05
  ./configure
  make && make install
  ```

  sshpass使用

  ```Bash
  sshpass  -p 密码 ssh 用户名@目标IP 要执行的命令

  sshpass -p "123456" scp list.txt user@10.148.6.99:/path/to/destination
  ```

# 确定当前shell

  ```Bash
  [09:04:37 ~ 1] $ echo $0
  -bash
  [09:04:44 ~ 2] $ echo $SHELL
  /bin/bash
  [09:04:49 ~ 3] $ ps -p $$
        PID    PPID    PGID     WINPID   TTY     UID    STIME COMMAND
       1236    4940    1236       4360  pty1     500 09:04:35 /usr/bin/bash
  ```

# mount挂载/磁盘映射

  ```Bash
  mount -t cifs -o username=windows登录账户,password=windows登录密码 //windows主机地址/共享目录 /home/用户名/挂载到的目录
  # 挂载到的目录需提前创建, 目录名后面不带斜杠, 带斜杆执行貌似不成功 
  ```

# 字符串比较

  ```
  注意:==的功能在[[]]和[]中的行为是不同的，如下:
1 [[ $a == z* ]]    # 如果$a以"z"开头(模式匹配)那么将为true
2 [[ $a == "z*" ]] # 如果$a等于z*(字符匹配)，那么结果为true
4 [ $a == z* ]      # File globbing 和word splitting将会发生
5 [ "$a" == "z*" ] # 如果$a等于z*(字符匹配)，那么结果为true
  ```

# 参考  

## Cygwin
  * [Cygwin官网](https://www.cygwin.com/)  

## ZSH
  * [Z Shell - 用强大的ZSH把Bash换掉](http://linuxlearner.diandian.com/post/2011-09-16/5080384)  
  * [我最喜爱的工具-oh-my-zsh](http://www.kafeitu.me/shell/2012/03/25/oh-my-zsh.html)  
  * [Mac 下的vim 美化（iterm2 Zsh Powerline）](http://mjason.github.io/blog/2013/02/08/mac-xia-de-vim-mei-hua-%28iterm2-zsh-powerline%29/)  

## Shell
  * [shell 判断字符串是否存在包含关系](http://www.blogjava.net/xzclog/archive/2011/03/04/345712.html)
  * [sed常见用法总结](http://blog.csdn.net/u011750989/article/details/39005831)
  * [tput 命令行使用说明](http://blog.csdn.net/fdipzone/article/details/9993961)
  * [Shell中字符串、数值的比较](http://www.cnblogs.com/mydomain/archive/2012/09/25/2700931.html)

## Unix
  * [UNIX 技巧: UNIX 高手的另外 10 个习惯](http://www.ibm.com/developerworks/cn/aix/library/au-unixtips/)
