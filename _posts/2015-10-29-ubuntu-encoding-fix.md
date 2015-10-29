---
layout: post
title: "ubuntu下中文乱码解决方案"
description: ""
category: ubuntu
tags: [ubuntu]
---

1、ibus输入法
Ubuntu 系统安装后已经自带了ibus输入法，在英语环境下默认不启动。
配置ibus自动启动可以在ubuntu系统菜单上选择System --- Preferences --- Startup Applications，在该窗口中增加一个程序：
Name: ibus-daemon
Command: ibus-daemon -d -x -r
ibus默认提供的中文输入法比较弱智，需要额外安装ibus-pinyin，命令如下：
sudo apt-get install ibus-pinyin
这 时，还需要将ibus-pinyin输入法启动。在ubuntu系统菜单上选择System --- Preferences --- IBus Preferences，在Input Method页中的"Select an input method"下拉框中选择增加Chinese – Pinyin，就是图标中有个一个大大的"拼"字的那一个，然后点击Add按钮，最后通过Up按钮将该输入法移动到最上面。
系统重启后，通过Ctrl + 空格即可调出ibus输入法。
ibus输入法总体来说不错，但是在我的环境下发现无法在部分Java程序中调出来，例如Netbeans、OpenProj。
2、fcitx输入法
由于ibus的缺陷，所以我尝试了fcitx，使用下来也非常不错，而且可以在Java程序中正常使用，只是在这种情况下光标跟随有些问题，输入界面会停 留在屏幕最下端，但是可以接受，比起ibus不能使用要好多了。
安装fcitx：
sudo apt-get install fcitx
启动fcitx：
im-switch -s fcitx
注销后重新登录，fcitx就会生效。
如果需要切换回ibus，可以运行im-switch -s ibus，然后注销，重新登录。
fcitx同样可以通过Ctrl + 空格调出，这时会发现fcitx显示的中文是方框，因此需要修改fcitx的配置。Fcitx的配置文件在~/.fcitx/config，该文件为 GBK编码，在Ubuntu下显示不正常，可以通过如下方式操作：
cd ~/.fcitx
iconv -f gbk -t utf8 config > config.tmp
编辑config.tmp文件：
显示字体(中)=WenQuanYi Micro Hei
显示字体大小=10
使用粗体=0
保存退出，然后运行命令：
iconv -f utf8 -t gbk config.tmp > config
注销后重新登录，fcitx显示正常。
3、网页上Flash中的中文显示为方框的解决办法
编辑/etc/fonts/conf.d/49-sansserif.conf文件，作如下修改：
<edit name="family" mode="append_last">
<string>WenQuanYi Micro Hei</string>
</edit>
4、Java程序部分中文显示为方框的解决办法
在$JAVA_HOME/jre /lib/fonts目录下建立fallback目录，将中文字体文件复制（或link）到fallback目录。
sudo mkdir $JAVA_HOME/jre/lib/fonts/fallback
sudo ln /usr/share/fonts/truetype/wqy/wqy-microhei.ttc $JAVA_HOME/jre/lib/fonts/fallback/
5、转换文件内容编码
Windows下生成的纯文本文件，其中文编码为GBK，在Ubuntu下显示为乱码，可以使用iconv命令进行转换：
iconv -f gbk -t utf8 source_file > target_file
6、转换文件名编码
Windows下压缩的zip文件，在 Ubuntu下解开时，中文文件名会显示乱码，可以用convmv解决。
安装convmv：
sudo apt-get install convmv
转换文件或目录：
convmv -f gbk -t utf8 -r --notest *
7、解压zip文件乱码
在Ubuntu下使用unzip解压Widnows环境下生成的zip文件，会发生文件名或者目录名乱码现象，解决办法是使用 7-zip和convmv。
安装7-zip和convmv：
sudo apt-get install convmv p7zip-full
解压zip文件：
LANG=C 7z e zip_file
convmv -f gbk -t utf8 -r --notest *
8、解压rar文件乱码
在ubuntu下解压Windows环境下生成的rar文件，同样会碰到中文乱码问题，例如使用7z来解压。
解决办法是使用unrar来解压。
安装unrar：
sudo apt-get install unrar
9、PDF中文乱码
PDF文件中的中文显示出乱码的情况下，可以安装poppler-data来解决：
sudo apt-get install poppler-data
10、字体安装
1) 安装微软字体
sudo aptitude install msttcorefonts
2)手工安装其它字体
在/usr/share/fonts目录下建立字体目录，例如：/usr/share/fonts/myfonts，并将字体文件复制或LINK到该目 录。
cd /usr/share/fonts/myfonts/
sudo mkfontscale
sudo mkfontdir
* 在不执行以下命令的情况下，结果正常：
sudo fc-cache -f -v
11、默认字体配置
sudo cp /etc/fonts/conf.avail/69-language-selector-zh-cn.conf /etc/fonts/conf.d
sudo vi /etc/fonts/conf.d/69-language-selector-zh-cn.conf
12、 Evolution中文附件问题
使用发现Evolution发送的名称中带有中文的附件，使用Evolution可以正常解析，但是用 Foxmail或者Outlook接收后无法正确解析出附件。解决办法：
在evolution菜单中选择Edit --- Preferences --- Composer Preferences，在Default Behavior中勾选Encode file names in an Outlook/GMail way。
文章来源：http://forum.ubuntu.org.cn/viewtopic.php?f=8&t=267255
