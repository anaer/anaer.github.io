1.  sed命令基本语法

     1.1 sed命令格式

     sed [options] {sed-commands} {input-file}

     1.2 sed的p命令与-n选项(print, --quiet --silent)

    只打印第一行：
       sed -n '1 p' example.txt

    打印第一行至第三行
      sed -n '1,3 p' example.txt

    打印Jason所在行
      sed -n '/Jason/ p' example.txt

    打印Jason至Jane所在的行
      sed -n '/Jason/,/Jane/ p' example.txt

    打印以103开头的行
      sed -n '/^103/ p' example.txt

打印以Manager结尾的行

sed -n '/Manager$/ p' example.txt

以数字开头，而且是连续重复三次

sed -n '/^[0-9]\{3\}/ p' example.txt

每隔一行打印一次

sed -n '1~2 p' example.txt

1.3 sed的d命令（delete）

删除103字符串所在的行

sed '/103/    d' example.txt

因为d命令跟P命令的语法是一模一样的，所以这里不再多举例。

1.4 更多sed选项

-f 从文件中读入命令

新建cmd.sed命令文件，文件内容如下：

/Jane/ p

在终端输入命令：sed -f cmd.sed example.txt

可在以命令文件中写多个命令

-e 选项执行多个命令

打印Jason和Jane所在的行

sed -n -e '/Jane/ p' -e '/Jason/ p'   example.txt


2、sed替换命令（重点）

1  替换命令格式

sed '[address-range|pattern-range]
s/originalstring/replacement-string/[substitute-flags]'
inputfile

address-range：地址列表，表示从哪个地方开始执行，如：1，3表示第一行到第3行。

pattern-range：样式列表，表示从哪个样式匹配串开始。如：/Jane/,表示从行中包含字符串Jane的行开始执行。[]中的都是可选的。

s:表示要执行替换命令(substitute)

originalstring：需要被替换的字符串

replacement-string：替换后的字符串。

substitute-flags：可选替换标志符。

2  准备工作

新建一个example.txt文本，输入以下内容：

101,John Doe,CEO

102,Jason Smith,IT Manager

103,Raj Reddy,Sysadmin

104,Anand Ram,Developer

105,Jane Miller,Sales Manager

3  address-range和pattern-range

a)  把第一行的John替换成guozi字符串

sed '1 s/John/guozi/' example.txt

b)  把第二行至第五行的Manager替换成guozi

sed '2,5 s/Manager/guozi/' example.txt

c)  把John所以字符串行当中的CEO替换成XXX

sed '/John/ s/CEO/XXX/' example.txt

d)  从第四行而且包含字符串Ram的行中，把Developer字符串替换成XXX

sed '4,/Ram/ s/Developer/XXX/' example.txt

e)  如果没有address-range和pattern-range，那么就会把每一行碰到的第一个匹配字符串给替换掉。

sed 's/1/AAA/' example.txt

4  substitute-flags

3.1全局标志g(globe)

全局标志会把遇到的所有满足条件的字符串给替换掉

sed 's/1/AAA/g' example.txt

3.2数字标志1,2,3

把要匹配串中的第2个符合条件的匹配串替换成我们想要的字符串

sed 's/1/AAA/2’ example.txt

3.3又见p(print)标志

sed -n 's/1/AAA/p' example.txt

3.4写标志w(write)

把每一行碰到第一个字符串John 替换成guozi 字符串，并写入output.txt中

sed 's/John/guozi/w output.txt' example.txt

对比重定向

重定向会把所以输出到终端的内容全部放到文本当中，而w开关只会把我们所做过修改的行写入文件当中。

3.5敏感标志i(ignore flag)

忽略大小写，把文本当中所有包含jason字符串的行替换成AAAA字符串

sed 's/jason/AAAA/gi' example.txt

3.6联合使用标志

可以使用多个标志来对字符串进行替换并保存

sed 's/jason/AAAA/gipw output2.txt' example.txt

5  替换命令定界符

格式1：Sed ‘s///’ example.txt

格式2：Sed ‘s@@@’ example.txt

用处：使用合理的定界符可以方便的阅读我们的程序代码。

6  强大的&——样式匹配

将origin-string替换到replace-string当中

sed 's/John/[&]/' example.txt

需求：将开头为三位数字的外面再加一层{}

sed 's/^[0-9]\{3\}/{&}/' example.txt

作业：将如下的文本前面三位数截取出来，并加上大括号

101,John Doe,CEO

102,Jason Smith,IT Manager

103,Raj Reddy,Sysadmin

104,Anand Ram,Developer

105,Jane Miller,Sales Manager

最终输入效果为：

{101}

{102}

{103}

{104}

{105}



3、sed应用实例

1 直接替换文本内容

有用的-i选项——强烈要求记住此选项！

2 上一堂课作业讲解

作业：将如下的文本前面三位数截取出来，并加上大括号

101,John Doe,CEO

102,Jason Smith,IT Manager

103,Raj Reddy,Sysadmin

104,Anand Ram,Developer

105,Jane Miller,Sales Manager

最终输入效果为：

{101}

{102}

{103}

{104}

{105}

解法一：sed 's/\(^[0-9]*\),.*/{\1}/g' example.txt

解法二：sed 's/\([^,]*\).*/{\1}/' example.txt

3 其它实例详解

a) 截取网卡IP地址

解法一：使用cut命令

ifconfig eth0 | grep "inet addr" | cut -d: -f 2 | cut -d" " -f 1

解法二：sed命令

1） ifconfig eth0 | sed -e '/inet addr/ !d' -e 's/[^0-9]*//' -e 's/ .*//'

2） ifconfig eth0 | sed -e '/inet addr/ !d ; s/[^0-9]*// ;s/ .*//'

3） ifconfig eth0 | sed -e '/inet addr/ !d;

s/\([^0-9]*\)\(\([0-9]\{1,3\}\.\)\{3\}[0-9]\{1,3\}\).*/\2/'

b) 去除注释和空行

sed 's/^#.*//g' my.cnf

sed -i -e 's/^#.*//g ; /^$/d' my.cnf



4、附加的sed命令

1. 使用 a 命令追加行

格式：sed '[address] a the-line-to-append' input-file

示例：

1) 在文本的第2行后追加一行

sed '2 a 203,Jack Johnson,Engineer' employee.txt

2) 在文本最后追加一行

sed '$ a 106,Jack Johnson,Engineer' employee.txt

3) 在文本匹配处增加多行

sed '/Jason/a\

203,Jack Johnson,Engineer\

204,Mark Smith,Sales Engineer' employee.txt

2. 使用i命令插入行

格式：sed '[address] i the-line-to-insert' input-file

用法跟a命令类似，不同的是在匹配地址所有行之前

3. 使用c命令修改行

格式：sed '[address] c the-line-to-insert' input-file

意义不同，用法类似

4. 使用l命令打印隐藏字符

格式：sed –n l input-file

5.使用=命令打印行号

格式：sed = input-file

打印字符串所在行号

sed ‘/string/ =’ input-file

6.使用y命令作字符转换

格式： sed ‘y/original-string/replace-string/’ input-file

示例：sed 'y/abcde/ABCDE/' employee.txt

可用于加密字符串

7.使用q命令终止执行

示例：sed ‘5 q’ input-file 执行完第5行后终止

sed ‘/root/ q’ input-file匹配到root行后退出
