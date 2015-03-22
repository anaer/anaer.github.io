---
layout: post
title: "Eclipse配置优化"
file: 2014-08-04-eclipse.md
update: 2015-01-28 21:44
description: "eclipse优化配置"
category: Eclipse
tags: [Eclipse]
---

### eclipse优化设置
#### Eclipse不显示SVN项目图标

      解决方法:
      1. 确认Eclipse中SVN 资源库可以正常访问
      2. 项目右键->Team->Share Project... 选择SVN
         Eclipse会提示:
         项目已有SVN/目录。有可能它先前已共享...。将自动地使用以下信息进行共享。
         用户:
         主机:[SVN路径]
         点击Finish即可完成SVN的连接。

#### Eclipse控制台输出没对齐

      使用等宽字体
      Preferences->General->Appearance->Colors and Fonts->Text Font 默认等宽字体

#### 备份工作空间workspace

        通常情况下，新解压出来的eclipse的默认配置是不能够满足我们的使用的，需要在新建的workspace中修改各种配置，比如编辑器的背景颜色、字体设置和字符集设置等，但是当我们新建了一个workspace或者新解压了一个eclipse后，原来的配置就没有了，重新设置一遍很是费时。现从网上找到两种办法来保存eclipse的配置信息。

      方法一：直接保存一个已经配置好但没建项目的空workspace（推荐）
          配置就保存在workspace中，把一个已配置好但没建工程的空workspace保存起来(如压缩一个副本) ，以后不要新建workspace,解压一下,改个新名字，启动Eclipse时指向新workspace就行。
      方法二：使用eclipse的导出功能（不推荐，很多东西设置不能导出）
      在菜单栏选择File -> Export... -> General -> Preferences，导出来即可！


#### 批量替换字符串
      先选中你要替换的东东，然后再菜单栏中找到Search→Text→Project，这样就会在整个项目中查找单词。然后在Search的Console中，单击项目，右键选择Replace All，填入你想替换的东东，就OK了。但是貌似不支持Whole Word。


#### eclipse不格式化注释
      Java->Code Style->Formatter点击Edit 后在Tab上选择Comments,将General settings中的"Enable comment formatting"前面的勾去掉就可以了


#### Eclipse 关闭鼠标悬停提示
      Window->Preferences->Java->Editor->Hovers 将[Combined Hover]取消即可.

#### 默认折叠配置
    window->perference->java->editor->folding

#### Eclipse 每次 debug 时要求 Edit Source Lookup Path 添加被调试项目的解决方案
    Window -- Preferences -- Tomcat-- Source Path 然后选择当前运行的项目就可以

#### Eclipse 取消Javascript校验 (测试可用)

      Right click your project  (右单击工程属性)
      Select Properties -> JavaScript -> Include(选择JavaScript下的include菜单)
      Select Source tab (It looks similar to the Java Build Path Source tab)(选择SOURCE标签)
      Expand source folder(展开菜单)
      Highlight Excluded pattern(选择Excluded)
      Click Edit button(点击edit按钮)
      Click Add button next to Exclusion patterns box.在新对话框中点击add按钮
      Click Browse button and select the JavaScript source by name.(找到需要排除的javascript文件)

  ![hello world](http://www.myexception.cn/img/2013/12/07/11083785.png)
  ![hello world](http://www.myexception.cn/img/2013/12/07/11083786.png)



#### 默认编码设置
      编辑->设置编码  设置默认编码为utf-8

#### 配置tomcat路径
      窗口->首选项->Tomcat

#### 设置默认JDK

#### Maven 配置
     User Settings 指定settings.xml文件
            勾选 Download Artifact Source
            勾选 Download Artifact JavaDoc

#### 设置wiki默认编辑器
      常规->编辑器->文件关联
      *.wiki WikiText Editor

#### 高亮显示
      windows-> preferences->java->Editor->Mark Occurences

#### win7 字体
      操作步骤：打开Elcipse，点击菜单栏上的“Windows”——点击“Preferences”——点击“Genneral”——点击“Appearance”——点击“Colors and Font”——在右侧框展开“Basic”文件夹--双击“Text Font”——在弹出窗选择“Courier New”（注：这里可能找不到“Courier New”，点击字体选择框左下角的“显示更多字体”链接来打开设置字体的控制面板，找到“Courier New”，右键选择“显示”即可激活该字体）——点击按钮“确定”——点击按钮“OK”，完成。

#### Eclipse 初始设置
      配置工程默认字符集
      进入Eclipse菜单Window|Preferences|General|Workspace，设置Text file encoding为“UTF-8”。
      配置Java Compiler
      进入Eclipse菜单Window|Preferences|Java|Compiler，设置Compiler compliance level为“1.6”。
      配置Text Editors
      进入Eclipse菜单Window|Preferences|General|Editors|Text Editors，勾选Show print margin 和 Show line numbers两项。
      配置Maven
      进入Eclipse菜单Window|Preferences|Maven|User Settings，设置User Settings为“[M2_HOME]\conf\setting.xml”，其中[M2_HOME]为maven解压后的目录路径。
      配置Server环境
      进入Eclipse菜单Window|Preferences|Server|Runtime Environments，选择Add增加一个Apache Tomcat v6.x服务器设置，Tomcat installation directory选择[TOMCAT_HOME]，其中[TOMCAT_HOME]为tomcat解压后的目录路径。

#### eclipse关闭鼠标移动提示代码功能
  Window->Preferences->Java->Editor->Hovers 将[Variable Values]选择即可，如果第一个[Combined Hover]已经勾选，则将这个勾去掉，勾选[Variable Values]。如果还不行，就只能用ctrl+shift+i快捷键了。

#### string 格式化
      string.Format("消息{0}, {1}", param1, param2);

#### Eclipse tab 使用 空格
      "1. Window-->Preferences-->Java-->Code Style-->Formatter
      然后右边选择 Edit...按钮，在General Settings页中 Tab policy 右边的下拉框，选择Space only!

      2. Window-->Preferences-->General-->Editors-->Text Editors

      右边的选项Insert spaces for tabs 勾上！然后 Displayed tab width =4也可以


### JSP Files
#### 指定jsp charset
    WEB-JSP-Files Encoding=ISO 10646/Unicode(UTF-8)
