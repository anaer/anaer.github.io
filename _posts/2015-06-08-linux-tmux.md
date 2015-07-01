---
layout: post
title: "Linux工具Tmux"
description: "Linux工具tmux"
category: Linux
tags: [Linux, Tmux]

---

#### Tmux介绍

tmux 是一个与 GNU screen 类似的程序，可作为后者的替代品使用。tmux 采用 BSD 许可授权，其最新版本（当前是 0.5）的源代码可从 SourceForge 网站下载。
与 GNU screen 相似，tmux 也使用快捷键来执行相关操作。要创建一个新的窗口，可以按 C-b c，即先按 Ctrl-b，再按 c。在各个窗口间切换可使用下列快捷键：

#### Tmux快捷键
C-b n 切换到下一个窗口
C-b p 切换到上一个窗口
C-b 0、C-b 1……C-b n 切换到第 n 个窗口
分离会话可执行 C-b d

#### Tmux配置

默认情况下,Tmux使用vim颜色表现不正常, 需要添加配置
vim ~/.tmux.conf
set -g default-terminal "screen-256color"
启动时,使用tmux -2启动, -2 Force tmux to assume the terminal supports 256 colours.

#### Tmux复制

1. Ctrl+a  按 [ 进入 tmux屏幕拷贝模式
2. 然后按空格键开始复制
3. 使用类似vim的上下左右键方式进行选中
4. 按enter退出复制模式
5. Ctrl＋a  按 ］ 进行粘贴
