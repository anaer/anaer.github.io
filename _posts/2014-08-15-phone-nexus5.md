---
layout: post
title: "nexus 5"
description: "nexus 5手机"
category: phone
tags: [android]
---

#### 支持N5的第三方ROM团队  

  * [yunos](http://bbs.yunos.com/read/263263248)
  * [miui](http://www.miui.com/forum-386-1.html)
  * [CyanogenMod](http://download.cyanogenmod.org/?device=hammerhead) 
  * [SlimKait](http://www.slimroms.net/index.php/downloads) 
  * [Paranoid](http://download.paranoidandroid.co/roms/hammerhead/) 
  * [OmniRom](http://dl.omnirom.org/hammerhead/) 
  * [mokee](http://download.mfunz.com/?device=hammerhead) 
  * [AOKP](http://aokp.co/devices/hammerhead) 
  * [ChameleonOS](http://roms.chameleonos.org/index.php?device=hammerhead) 
  * [carbon](http://carbon-rom.com/downloads/?device=hammerhead) 
  * [mahdi](http://mahdi-rom.androidfilesharing.com/Nexus%205/) 
  * [clockworkmod](http://www.clockworkmod.com/rommanager) 

#### Nexus5刷机工具  
  * [Nexus Root Toolkit](http://www.wugfresh.com/nrt/) 
  * [一键ROOT工具](http://download.chainfire.eu/363/CF-Root/CF-Auto-Root/CF-Auto-Root-hammerhead-hammerhead-nexus5.zip) 
  * [刷机教程](http://tieba.baidu.com/p/2754103527) 
  * [原厂系统镜像](https://dl.google.com/dl/android/aosp/hammerhead-krt16m-factory-bd9c39de.tgz)

#### 给我们的Nexus 5重新上锁

    很多人都有强迫症，拿到机子后root了，刷了各位各家的ROM，可能还换回原生了，可开机有个锁。
    1. 在电脑中下载安装 Google USB Driver
    2. 同时按住“音量-”和“电源”两键进入手机引导模式
    3. 用 USB 线连接手机和电脑，在电脑中打开命令行窗口，输入：
    　　fastboot devices
    　　这个命令会列出已连接的设备。如果您的手机出现了，那么很好，继续。
    　　否则可能是您的驱动程序未被正确安装。
    4. 在电脑命令行窗口输入：
    　　fastboot oem lock
    　　此时手机屏幕上会出现对话框，问您是否要重新上锁 bootloader
    　　按音量键高亮“Yes”然后按电源键确认。
    5. 操作结束后，在电脑命令行窗口输入：
    　　fastboot reboot
    6. 耐心等待手机重启

#### 刷回原厂

    PART 1. 需要下载的东西
    1、Android 4.4 Nexus5的工厂镜像 下载地址：提供三个链接，自由选择吧
         https://developers.google.com/android/nexus/images#hammerhead
         http://pan.baidu.com/share/link? ... 6&uk=1124363070
         http://kuai.xunlei.com/d/KSYvAAKWgAAlh3hS301
    2、Fastboot 工具   
        华为网盘附件：
        【华为网盘】 Fastboot工具 (252.79K)

    PART 2. 准备工作
    1、请备份个人资料，以免带来不必要的损失；
    2、将下载的工厂镜像解压；
    3、将下载的Fastboot工具解压，得到名为【Fastboot】文件夹。

    PART 3. 刷机步骤
    1、将解压的工厂镜像文件夹内全部文件复制到Fastboot文件夹内；
    2、将手机完全关闭后，同时按住【音量减】+【电源键】，直至手机屏幕被点亮后松开，进入fastboot模式；
    3、使用USB数据线将手机与电脑连接；
    4、运行Fastboot文件夹内的【flash-all.bat】；
    5、程序会自动将工厂镜像刷入手机；
    6、显示finished. Press any key to exit，表示刷入镜像完成，断开USB数据线；
    7、手机自动重启后，经过一番开机设置后，便可使用。

    P.S.  根据大家回复使用中遇到的部分问题进行下说明：
    1、对于找不到flash-all.bat的问题：请确认一下PART1中提到的文件是不是都下载了，并把下载的fastboot工具和工厂镜像解压到同一个文件夹。
    2、对于提示找不到*.sig, press any key to exit.之类问题。请确认驱动安装已正确安装，并且将电脑上的所有手机助手类的软件彻底关闭。
    3、对于想要保留用户数据的问题：请尝试将flash-all.bat中fastboot -w中的-w去掉。但是大家变砖原因各异，不是百分百有效，理论上是没问题的。
    4、对于刷机后的其他问题：由于刷机前大家可能进行了许多不明结果的尝试导致需要刷机。请尝试双清后解决。
