---
layout: post
title: "Linux Shell命令"
file: 2014-08-02-linux-shell.md
update: 2014-11-15 10:03
tags: [Linux, Shell]
---

### 终端打印

#### echo命令
  + echo 会自动添加换行符

```
[8:22 74 ~ ] %echo hello world     # 普通字符 可以直接输出 
hello world
[8:22 75 ~ ] %echo hello;world     # shell中;作为命令分隔符
hello
bash: command not found: world
[8:22 76 ~ ] %echo "hello;world"   # 双引号中;作为普通字符
hello;world
[8:23 77 ~ ] %echo "$hello world"  # 双引号会对$hello变量求值
 world
[8:23 78 ~ ] %echo '$hello world'  # 单引号原样输出, 不对变量$hello求值
$hello world
```

  + echo 忽略换行符

```
[08:51:35 ~ 8] $ echo "123"
123
[08:52:45 ~ 9] $ echo -n "123"
123[08:52:50 ~ 10] $
```

  + echo 中的转义字符
  使用echo -e 表明为包含转义字符的字符串

  + echo 彩色输出
  1. 必须使用echo -e 
  2. \e[1;31m 将颜色设为红色, \e[0m 将颜色重置
  3. 颜色码
  字体:重置=0, 黑色=30, 红色=31, 绿色=32, 黄色=33, 蓝色=34, 洋红=35, 青色=36, 白色=37
  背景:重置=0, 黑色=40, 红色=41, 绿色=42, 黄色=43, 蓝色=44, 洋红=45, 青色=46, 白色=47

```
[08:55:39 ~ 12] $ echo -e "\e[1;31m This is red text \e[0m"
 This is red text
[08:55:40 ~ 13] $ echo -e "\e[1;42m Green Background \e[0m"
 Green Background
```
  
```
[08:51:31 ~ 6] $ echo "1\t2\t3"
1\t2\t3
[08:51:34 ~ 7] $ echo -e "1\t2\t3"
1       2       3
```

#### printf命令
  printf命令不会自动添加换行符，需要手动添加
  示例:

```
#!/bin/bash 
#文件名: printf.sh

printf "%-5s %-10s %-4s\n" No Name Mark         # %-5s 输出字符串,左对齐,宽度5
printf "%-5s %-10s %-4.2f\n" 1 Sarath 80.3456   # %-4.2f 输出浮点数,左对齐,宽度4 宽度不足自动扩展,保留2位小数
printf "%-5s %-10s %-4d\n" 2 James 90           # $-4d 输出整型,左对齐,宽度4
printf "%-5s %-10s %4d\n" 3 Jeffy 88            # $4d 输出整型,右对齐,宽度4
printf "%-5s %-10s %-04d\n" 4 Jeff 77           # $-04d 输出整型,左对齐,宽度4,不足4位左补0,因为左对齐补0没效果
printf "%-5s %-10s %04d\n" 5 Leon 66            # $04d 输出整型,右对齐,宽度4,不足4位左补0
```

  输出 

```
[8:40 93 ~ ] %sh printf.sh
No    Name       Mark
1     Sarath     80.35
2     James      90
3     Jeffy        88
4     Jeff       77
5     Leon       0066
```

### 变量
#### 变量赋值
  
```
[09:12:09 ~ 28] $ var="value"   # =号旁边不能带空格,var = "value" 是相等操作不是赋值操作
[09:12:13 ~ 29] $ echo $var
value
[09:16:54 ~ 37] $ echo ${#var}  # ${#var} 查询变量值的长度
5
```

#### 识别当前的shell版本

  ```Bash
  [09:04:37 ~ 1] $ echo $0
  -bash
  [09:04:44 ~ 2] $ echo $SHELL
  /bin/bash
  [09:04:49 ~ 3] $ ps -p $$
        PID    PPID    PGID     WINPID   TTY     UID    STIME COMMAND
       1236    4940    1236       4360  pty1     500 09:04:35 /usr/bin/bash
  ```
  
#### 查询系统位数

```
linux查询系统是多少位的：getconf LONG_BIT ，如果是32位的下面会给出32的提示，64位的就是64
```

#### 检查是否为超级用户
  UID是一个重要的环境变量,可以用于检查当前脚本是以超级用户还是以普通用户的身份运行的.
  root用户的UID是0;

```
#!/bin/bash
#文件名: isRoot.sh

if [ $UID -ne 0 ]; then
  echo Non root user. Please run as root.
else
  echo "Root user"
fi
```

#### Bash提示字符串PS1

```
# 放在.bashrc中
if [ -n "${BASH_VERSION}" ]; then
  # \u 用户名
  # \h 主机名
  # \w 当前工作目录
  # \t 当前时间
  # \# 当前命令计数 
  PS1="[\e[1;31m\t \e[1;34m\w \e[1;35m\#\e[0m] $ "
fi
```

### 数学计算
#### 使用let命令进行数学计算
  * 使用let命令可以直接执行基本的算术操作,变量名之前不需要再添加$.

```
[09:39:13 ~ 87] $ no1=4
[09:39:37 ~ 88] $ no2=5
[09:39:39 ~ 89] $ no3=no1+no2
[09:39:46 ~ 90] $ echo $no3
no1+no2
[09:39:51 ~ 91] $ no3=$no1+$no2
[09:40:03 ~ 92] $ echo $no3
4+5
[09:40:06 ~ 93] $ let no3=no1+no2
[09:40:22 ~ 94] $ echo $no3
9

# 自增自减操作
[09:40:27 ~ 96] $ let no1++
[09:45:11 ~ 97] $ let no2--
[09:45:15 ~ 98] $ echo $no1 $no2
5 4

# 加减操作
[09:45:23 ~ 99] $ let no1+=6
[09:46:20 ~ 100] $ let no2-=6
[09:46:26 ~ 101] $ echo $no1 $no2
11 -2

# 其他方法
[09:46:28 ~ 102] $ no4=$[ no1 + no2 ]  # []操作与let类似, 变量前可加可不加$
[09:47:41 ~ 103] $ echo $no4
9
[09:47:46 ~ 104] $ no4=$[ $no4 + 5 ]
[09:48:20 ~ 105] $ echo $no4
14
[09:48:23 ~ 106] $ no4=$(( no4 + 50 ))
[09:48:55 ~ 107] $ echo $no4
64
[09:48:58 ~ 108] $ no4=$(( $no4 + 50 ))
[09:49:03 ~ 109] $ echo $no4
114
[09:49:05 ~ 110] $ no5=`expr 3+4`       # +号左右需要带空格
[09:49:29 ~ 111] $ echo $no5
3+4
[09:49:31 ~ 112] $ no5=`expr 3 + 4`
[09:49:38 ~ 113] $ echo $no5
7
[09:49:40 ~ 114] $ no5=$(expr $no5 + 5)
[09:50:13 ~ 116] $ echo $no5
12
# 以上方法只能用于整数运算, 不支持浮点数


```

#### 浮点数运算
  * bc是一个用于数学运算的高级工具

  * 浮点数运算
    可以将参数放在运算之前,以分号;分隔

```
[09:53:06 ~ 120] $ echo "4 * 0.56" |bc
2.24
[09:53:16 ~ 121] $ no=54;
[09:54:55 ~ 122] $ result=`echo "$no * 1.5" | bc`
[09:55:11 ~ 123] $ echo $result
81.0
[09:55:15 ~ 124] $ echo "scale=2; 3/8" |bc
.37
[09:55:50 ~ 125] $ echo "scale=2;3/8" |bc
.37
```

  * 进制转换
  obase 表示输出进制
  ibase 表示输入进制
  默认输入输出为10进制

```
[09:55:55 ~ 126] $ no=99
[09:57:04 ~ 127] $ echo "obase=2;$no"|bc
1100011
[09:57:13 ~ 128] $ no=1100011
[09:57:28 ~ 129] $ echo "obase=10;ibase=2;$no"|bc
99
```

  * 计算平方及平方根

```
[09:57:40 ~ 130] $ echo "sqrt(100)"|bc
10
[09:58:02 ~ 131] $ echo "10^10"|bc
10000000000
[09:58:12 ~ 132] $ echo "2^10"|bc
1024
```

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


# Cygwin必装组件
  * 1. git
  * 2. vim
  * 3. mysql
  * 4. mysqld
  * 5. tput 需要安装ncurses
  * 6. zsh
  * 7. svn
  * 8. wget

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

## sshpass 
  安装sshpass

  ```Bash
  # 需要安装gcc-core和make
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


# 查看Linux版本系统信息方法汇总

  ```bash
  uname  -a                :查看当前操作系统内核信息
  cat  /etc/issue          :查看当前操作系统发行版信息
  cat  /proc/version       :查看当前操作系统版本信息
  cat  /proc/cpuinfo       :查看cpu相关信息，包括型号、主频、内核信息等
  getconf   LONG_BIT  	   :查看版本说明当前CPU运行在32bit模式下， 但不代表CPU不支持64bit
  lsb_release  -a          :查看系统描述 
  ```

# crontab命令详解
# 概述
  crontab是用来设置在固定时间点或时间间隔执行某条指令，类似于时程表。使用-u user是指定user用户的时程表。

# 参数

```
-e[UserName] :调出编辑器，编辑定时任务，打开后里边有多重文本编辑器，可更具自己偏好选择，若未指定UserName，则是当前shell下的用户

-r[UserName] :删除指定用户当前的时程表，则是当前shell下的用户

-l[UserName] :列出指定用户当前的时程表，则是当前shell下的用户

-v[UserName] :列出指定用户的cron作业状态，则是当前shell下的用户
```

3. 时程表的格式说明

```
 F1    F2   F3   F4  F5   program
(分钟  小时 日   月  星期 作业命令)
```

例如：5 */1 * * * /usr/sbin/ntpdate cms是指在每小时的第5分钟执行/usr/sbin/ntpdate cms这个命令。

说明见下图:
![说明图](/assets/images/cron.jpg)

4. 样例

```
#每天早上6点10分
10 6 * * * date

#每两个小时
0 */2 * * * date

#晚上11点到早上8点之间每两个小时，早上8点
0 23-7/2,8 * * * date

#每个月的4号和每个礼拜一到礼拜三的早上11点
0 11 4 * 1-3 date

#1月1日早上4点
0 4 1 1 * date

编写执行命令时要注意当前的环境变量。
```

# 参考  
  * [linux下的“定时器”：crontab](http://www.cnblogs.com/leocook/p/linux_crontab.html)

# Cheat——Linux命令行终极备忘录

# 安装pip
  在pip官网下载get-pip.pyp  
  执行以下命令安装

  ```bash
  python get-pip.py
  ```

# 使用cheat

  ```bash
  cheat tar
  ```

# 参考
  * [pip官网](https://pip.pypa.io/en/latest/installing.html)
  * [Cheat——Linux命令行终极备忘录](http://my.oschina.net/u/1040430/blog/311616)
  * [docopt](https://github.com/docopt/docopt)
  * [Cheat – An Ultimate Command Line ‘Cheat-Sheet’ for Linux Beginners and Administrators](http://www.tecmint.com/cheat-command-line-cheat-sheet-for-linux-users/)

# Linux查看系统配置常用命令

```
# uname -a # 查看内核/操作系统/CPU信息
# head -n 1 /etc/issue # 查看操作系统版本
# cat /proc/cpuinfo # 查看CPU信息
# hostname # 查看计算机名
# lspci -tv # 列出所有PCI设备
# lsusb -tv # 列出所有USB设备
# lsmod # 列出加载的内核模块
# env # 查看环境变量 资源
# free -m # 查看内存使用量和交换区使用量
# df -h # 查看各分区使用情况
# du -sh # 查看指定目录的大小
# grep MemTotal /proc/meminfo # 查看内存总量
# grep MemFree /proc/meminfo # 查看空闲内存量
# uptime # 查看系统运行时间、用户数、负载
# cat /proc/loadavg # 查看系统负载 磁盘和分区
# mount | column -t # 查看挂接的分区状态
# fdisk -l # 查看所有分区
# swapon -s # 查看所有交换分区
# hdparm -i /dev/hda # 查看磁盘参数(仅适用于IDE设备)
# dmesg | grep IDE # 查看启动时IDE设备检测状况 网络
# ifconfig # 查看所有网络接口的属性
# iptables -L # 查看防火墙设置
# route -n # 查看路由表
# netstat -lntp # 查看所有监听端口
# netstat -antp # 查看所有已经建立的连接
# netstat -s # 查看网络统计信息 进程
# ps -ef # 查看所有进程
# top # 实时显示进程状态 用户
# w # 查看活动用户
# id # 查看指定用户信息
# last # 查看用户登录日志
# cut -d: -f1 /etc/passwd # 查看系统所有用户

# cut -d: -f1 /etc/group # 查看系统所有组
# crontab -l # 查看当前用户的计划任务 服务
# chkconfig –list # 列出所有系统服务
# chkconfig –list | grep on # 列出所有启动的系统服务 程序
# rpm -qa # 查看所有安装的软件包

```

# shell脚本中双引号单引号反引号区别

```
单引号 ‘ 
由单引号括起来的字符都作为普通字符出现。特殊字符用单引号括起来以后，也会失去原有意义，而只作为普通字符解释。

双引号 “ 
由双引号括起来的字符，除$、、’、和”这几个字符仍是特殊字符并保留其特殊功能外，其余字符仍作为普通字符对待。对于$来说，就是用其后指定的变量的值来代替这个变量和$；对于而言，是转义字符，它告诉shell不要对其后面的那个字符进行特殊处理，只当作普通字符即可。可以想见，在双引号中需要在前面加上的只有四个字符$，，’和”本身。而对”号，若其前面没有加，则Shell会将它同前一个”号匹配。

反引号 ` 
反引号（`）这个字符所对应的键一般位于键盘的左上角，不要将其同单引号（’）混淆。反引号括起来的字符串被shell解释为命令行，在执行时，shell首先执行该命令行，并以它的标准输出结果取代整个反引号（包括两个反引号）部分。
```

### Linux命令详解

#### mv

```
-b ：若需覆盖文件，则覆盖前先行备份。 

-f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；

-i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！

-u ：若目标文件已经存在，且 source 比较新，才会更新(update)

-t ：该选项适用于移动多个源文件到一个目录的情况，此时目标目录在前，源文件在后。

```

#### ls
  1. 显示隐藏文件

   ```
   ls -a
   ```

  2. 按照文件/目录的类型, 用不同的颜色和符号加以区分

    ```
    ls -FG
    ```

  3. 显示详细信息

    ```
    ls -l
    ```

  4. 按创建时间排序

    ```
    ls -ltr
    ```

#### wc

```
参数 含义
-c 显示文件的Bytes数(字节数)及文件名输出到屏幕上
-l 将每个文件的行数及文件名输出到屏幕上
-m 将每个文件的字符数及文件名输出到屏幕上，
    如果当前系统不支持多字节字符其将显示与-c参数相同的结果
-w 将每个文件含有多少个词及文件名输出到屏幕上
```

# Linux Shell中的$0,$?,$!和<<'END'
  
  ```
  变量说明:
$$
Shell本身的PID（ProcessID）
$!
Shell最后运行的后台Process的PID
$?
最后运行的命令的结束代码（返回值）
$-
使用Set命令设定的Flag一览
$*
所有参数列表。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。
$@
所有参数列表。如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。
$#
添加到Shell的参数个数
$0
Shell本身的文件名
$1～$n
添加到Shell的各参数值。$1是第1参数、$2是第2参数…


<<'END'

...

END

其实END可以换成任意字符串，如‘HAHA’，<<是重定向，一般在其前面会有个shell命令，整个语法是END之间的内容作为shell命令的输入，如



END之间的内容作为cat命令的输入，所以接下来回车后会出现



这种语法在linux shell中叫HERE文档
  ```

#### Linux 查看进程端口

```
1.        netstat -tln              netstat -tln | grep 8083    netstat -tln 查看端口使用情况，而netstat -tln | grep 8083 则是只查看端口8083的使用情况  

2.查看端口属于哪个程序？端口被哪个进程占用           lsof -i :8083    

3.杀掉占用端口的进程           kill -9 进程id   
```

# 快捷键
  * 清屏 ctrl+l
  * 清除当前输入 ctrl+u

# 参考
  * [Linux查看系统配置常用命令](http://my.oschina.net/u/2009021/blog/311740)

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
## 博客专栏
  * [shell编程笔记](http://blog.csdn.net/column/details/linuxshellgradu.html)
