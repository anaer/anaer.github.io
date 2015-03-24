#!/usr/bin/sh
####################rsync配置说明########################
#使用rsync进行同步 rsync主要用来的远程备份 本地可以不使用
#rsyn支持增量同步
#rsync 不支持 源地址与目标地址 都是远程地址
#      源地址不能为远程地址?
# 路径中空格需要使用\转义
####################rsync配置说明########################

#备份vim配置
#rsync -avzP ~/.vimrc /cygdrive/e/Gcode/VIM/
#rsync -avzP ~/.myplugins-vimrc /cygdrive/e/Gcode/VIM/
#rsync -avzP ~/.vim /cygdrive/e/Gcode/VIM/
#备份git配置
#rsync -avzP ~/.gitconfig /cygdrive/e/Gcode/Cygwin/
#添加用户变量 因为切换用户后 会覆盖掉
#/usr/bin/crontab -l > /cygdrive/e/Gcode/Cygwin/crontab_$USERNAME.txt

#rsync -avzP ~/.bashrc /cygdrive/c/Users/Administrator/
#rsync -avzP ~/.gitconfig /cygdrive/c/Users/Administrator/
#rsync -avzP ~/.vimrc /cygdrive/c/Users/Administrator/
#rsync -avzP ~/.vim /cygdrive/c/Users/Administrator/
