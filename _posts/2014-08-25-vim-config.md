---
layout: post
title: "Vim优化配置"
description: "Vim优化配置"
category: vim
tags: [vim]
---

#### 配置
* 显示所有设置选项
:set all

* Vim中截取部分内容保存到其他文件
:起始行,结束行 w 文件名

* Vim中截取部分内容追加到其他文件
:起始行,结束行 w >> 文件名

#### Vim命令模式
1. ,替换为,换行
:%s/,/,\r/g

2. 删除空行
:%g/^$/d
:g/^$/d

3. 行前添加a.
:%s/^/a./g

4. 以十六进制显示
:%!xxd

5. 不以十六进制显示, 返回普通文本显示
:%!xxd -r

6. 删除文本每行开头的空格
:%s/^ *//g

7. 删除空行
:g/^$/d

8. 排序
:开始行,结束行 sort

9. 倒序
:开始行,结束行 sort!

10. 空格替换为换行
:%s/ /\r/g

#### 安装markdown 语法文件

```bash
$ cd ~/.vim/syntax/
$ wget https://raw.github.com/plasticboy/vim-markdown/master/syntax/mkd.vim
perl 官方提供了使用 Markdown.pl 文件进行转换。
http://daringfireball.net/projects/downloads/Markdown_1.0.1.zip
$ unzip Markdown_1.0.1.zip
$ sudo cp Markdown_1.0.1/Markdown.pl /usr/local/bin/
$ vi ~/.vimrc
" 添加如下代码
let mapleader = ","
nnoremap <leader>md :%!/usr/local/bin/Markdown.pl --html4tags <CR>
安装vundle,用于安装vim插件，类似apt等软件安装包
git clone http://github.com/gmarik/vundle.git $HOME/.vim/bundle/vundle
```

#### 文件编码

```
1. 在Vim中直接进行转换文件编码,比如将一个文件转换成utf-8格式
　　:set fileencoding=utf-8
2. enconv 转换文件编码，比如要将一个GBK编码的文件转换成UTF-8编码，操作如下
　　enconv -L zh_CN -x UTF-8 filename
3. iconv 转换，iconv的命令格式如下：
　　iconv -f encoding -t encoding inputfile
　　比如将一个UTF-8 编码的文件转换成GBK编码
　　iconv -f GBK -t UTF-8 file1 -o file2
```

#### 代码折叠
  ```
  1. 折叠方式
  可用选项来设定折叠方式：
  可在Vim 配置文件中设置 set fdm=XXX
  可直接在文件中使用注释调用vim命令 /* vim: set fdm=XXX: */
  有6种方法来选定折叠：
  manual          手工定义折叠
  indent           更多的缩进表示更高级别的折叠
  expr              用表达式来定义折叠
  syntax           用语法高亮来定义折叠
  diff                对没有更改的文本进行折叠
  marker           对文中的标志折叠
  注意，每一种折叠方式不兼容，如不能既用expr又用marker方式，我主要轮流使用indent和marker方式进行折叠。
  使用时，用 set fdm=marker 命令来设置成marker折叠方式（fdm是foldmethod的缩写）。
  要使每次打开vim时折叠都生效，则在.vimrc文件中添加设置，如添加：set fdm=syntax，就像添加其它的初始化设置一样。
  2. 折叠命令
  选取了折叠方式后，我们就可以对某些代码实施我们需要的折叠了，由于我使用indent和marker稍微多一些，故以它们的使用为例：如果使用了indent方式，vim会自动的对大括号的中间部分进行折叠，我们可以直接使用这些现成的折叠成果。
  在可折叠处（大括号中间）：
  zc      折叠
  zC     对所在范围内所有嵌套的折叠点进行折叠
  zo      展开折叠
  zO     对所在范围内所有嵌套的折叠点展开
  [z       到当前打开的折叠的开始处。
  ]z       到当前打开的折叠的末尾处。
  zj       向下移动。到达下一个折叠的开始处。关闭的折叠也被计入。
  zk      向上移动到前一折叠的结束处。关闭的折叠也被计入。
  当使用marker方式时，需要用标计来标识代码的折叠，系统默认是{{{和}}}，最好不要改动
  我们可以使用下面的命令来创建和删除折叠：
  zf      创建折叠，比如在marker方式下：
  zf56G，创建从当前行起到56行的代码折叠；
  10zf或10zf+或zf10↓，创建从当前行起到后10行的代码折叠。
  10zf-或zf10↑，创建从当前行起到之前10行的代码折叠。
  在括号处zf%，创建从当前行起到对应的匹配的括号上去（（），{}，[]，<>等）。
  zd      删除 (delete) 在光标下的折叠。
       仅当 'foldmethod' 设为 "manual" 或 "marker" 时有效。
  zD     循环删除 (Delete) 光标下的折叠，即嵌套删除折叠。
       仅当 'foldmethod' 设为 "manual" 或 "marker" 时有效。
  zE      除去 (Eliminate) 窗口里“所有”的折叠。
       仅当 'foldmethod' 设为 "manual" 或 "marker" 时有效。
  ```
#### 键盘图
  ![Vim键盘图](/album/vim-keyboard.png)
  ![Vim操作图](/album/vim.jpg)
  ![Vim常用快捷键导图1](/album/vim1.jpg)
  ![Vim常用快捷键导图2](/album/vim2.jpg)

#### Vim插件管理
https://github.com/tpope/vim-pathogen

```bash
mkdir -p ~/.vim/autoload ~/.vim/bundle && \
curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim
```

#### 用vim去掉utf-8 BOM

```
'去掉utf-8 BOM
:set nobomb
'保留utf-8 BOM
:set bomb
```

#### Vim中文帮助

```
set helplang=cn
设置 set helplang=cn 并不能马上看到中文帮助，我们还得下载中文帮助文件。
下载地址： http://vimcdoc.sourceforge.net/
下载文件： vimcdoc-1.6.0.tar.gz
得到中文帮助文件压缩包后，将压缩包中 doc 子目录的所有文件复制到 $VIM/vimfiles/doc 目录中。此时再输入 :help 命令就可以看到中文帮助了。
```

### 参考
* [Vim.org](http://www.vim.org/)
* [Vim扩展列表](http://vim-scripts.org/vim/scripts.html)
* [vim学习心得（一）——Cygwin下vim配置](http://www.cnblogs.com/zyumeng/p/3300027.html)
* [Vimer的程序世界](http://www.vimer.cn/)
* [Vim-推酷](http://www.tuicool.com/topics/11200023)
* [实用手册：130+提高开发效率的vim常用命令](http://www.chinaz.com/program/2013/1019/322871.shtml)
* [Vim Scripts](http://vim-scripts.org/vim/scripts.html)
* [vim encoding](http://www.cnblogs.com/xuxm2007/archive/2012/07/18/2556653.html)
* [强大的vim配置文件，让编程更随意](http://www.cnblogs.com/ma6174/archive/2011/12/10/2283393.html)
* [Vim常用命令](http://my.oschina.net/u/1861789/blog/366995)
* [属于程序员的神器，gvim7.4绿色版，已配置好的神奇版](http://download.csdn.net/download/maxize/7800915)
* [ExVim Vim定制版](http://exvim.github.io/)
* [janus](https://github.com/carlhuda/janus)
* [spf13](https://github.com/spf13/spf13-vim)
