---
layout: post
title: "ubuntu系统安装后环境部署"
description: ""
category: ubuntu
tags: [ubuntu]
---

0. 修改默认root密码
  `sudo passwd`
1. 安装vim
2. 安装git
3. 下载firefox Profile
  保存路径:~/.firefox-profile
4. vim ~/.mozilla/firefox/profiles.ini
```
[General]
StartWithLastProfile=1

[Profile0]
Name=default
IsRelative=1
Path=i11ygygi.default

[Profile1]
Name=MyFirefox
IsRelative=0
Path=/home/lvcn/.firefox-profile
Default=1
```
5. git clone https://github.com/anaer/anaer.github.io.git
6. git clone https://github.com/anaer/root.git
7. git clone https://github.com/anaer/myweb.git
8. git clone https://github.com/anaer/mystock.git
9. 修改vim默认主题样式
10. java 8/9 安装
```
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer

sudo apt-get install oracle-java9-installer

java版本切换
sudo update-java-alternatives -s java-8-oracle
```
11. 终端下复制粘贴
Ctrl+Shift+C，Ctrl+Shift+V
12. 安装flash浏览器插件
tar -zxvf install_flash_player_11_linux.x86_64.tar.gz
sudo cp libflashplayer.so /usr/lib/mozilla/plugins/
重启firefox浏览器
13. 添加.gitconfig配置
14. 下载yong输入法
15. 更换镜像源
sudo gedit /etc/apt/sources.list
deb http://mirrors.163.com/ubuntu/ precise main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ precise-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ precise-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ precise-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ precise-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ precise main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ precise-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ precise-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ precise-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ precise-backports main restricted universe multiverse

sudo apt-get update
sudo apt-get upgrade
16. 安装screen
17. 安装7z
    sudo apt-get install p7zip
18. 安装jdk, maven, tomcat
  这几个还是手动下载安装吧
19. 安装mysql-server
20. 导入数据库
21. deploy发布工程
