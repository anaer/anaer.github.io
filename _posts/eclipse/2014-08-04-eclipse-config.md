---
layout: post
title: "Eclipse优化配置"
file: 2014-08-04-eclipse-config.md
update: 2015-03-24 16:34
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
    Preferences->General->Appearance->Colors and Fonts->Text Font 默认 使用等宽字体

#### 备份工作空间workspace

    1. 直接保存一个已经配置好但没建项目的空workspace
    可以将workspace保存到如github,gitosc等平台进行版本控制
    2. 使用eclipse的导出功能
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
    配置工程默认字符集
    进入Eclipse菜单Window|Preferences|General|Workspace，设置Text file encoding为“UTF-8”。

#### 配置tomcat路径
    窗口->首选项->Tomcat

#### 设置默认JDK
    配置Java Compiler
    进入Eclipse菜单Window|Preferences|Java|Compiler，设置Compiler compliance level为“1.6”。

#### Maven 配置
     User Settings 指定settings.xml文件
    勾选 Download Artifact Source
    勾选 Download Artifact JavaDoc

#### 设置wiki默认编辑器
    常规->编辑器->文件关联
    *.wiki WikiText Editor

#### 高亮显示
    windows-> preferences->java->Editor->Mark Occurences

#### 配置Text Editors
    进入Eclipse菜单Window|Preferences|General|Editors|Text Editors，勾选Show print margin 和 Show line numbers两项。
#### 配置Maven
    进入Eclipse菜单Window|Preferences|Maven|User Settings，设置User Settings为“[M2_HOME]\conf\setting.xml”，其中[M2_HOME]为maven解压后的目录路径。
#### 配置Server环境
    进入Eclipse菜单Window|Preferences|Server|Runtime Environments，选择Add增加一个Apache Tomcat v6.x服务器设置，Tomcat installation directory选择[TOMCAT_HOME]，其中[TOMCAT_HOME]为tomcat解压后的目录路径。

#### eclipse关闭鼠标移动提示代码功能
    Window->Preferences->Java->Editor->Hovers 将[Variable Values]选择即可，如果第一个[Combined Hover]已经勾选，则将这个勾去掉，勾选[Variable Values]。如果还不行，就只能用ctrl+shift+i快捷键了。

#### Eclipse tab 使用 空格
    1. Window-->Preferences-->Java-->Code Style-->Formatter
    然后右边选择 Edit...按钮，在General Settings页中 Tab policy 右边的下拉框，选择Space only!

    2. Window-->Preferences-->General-->Editors-->Text Editors

    右边的选项Insert spaces for tabs 勾上！然后 Displayed tab width =4也可以

### JSP Files
#### 指定jsp charset
    WEB-JSP-Files Encoding=ISO 10646/Unicode(UTF-8)
