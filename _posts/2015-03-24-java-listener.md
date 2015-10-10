---
layout: post
title: "java 鼠标 键盘事件"
description: "java 鼠标 键盘事件"
category: java
tags: [java]
---

#### Java中的鼠标和键盘事件

1、使用MouseListener借口处理鼠标事件
鼠标事件有5种：按下鼠标键，释放鼠标键，点击鼠标键，鼠标进入和鼠标退出
鼠标事件类型是MouseEvent，主要方法有：
getX(),getY() 获取鼠标位置
getModifiers() 获取鼠标左键或者右键
getClickCount() 获取鼠标被点击的次数
getSource() 获取鼠标发生的事件源
事件源获得监视器的方法是addMouseListener()，移去监视器的方法是removeMouseListener()
处理事件源发生的时间的事件的接口是MouseListener 接口中有如下的方法
mousePressed(MouseEvent) 负责处理鼠标按下事件
mouseReleased(MouseEvent) 负责处理鼠标释放事件
mouseEntered(MouseEvent) 负责处理鼠标进入容器事件
mouseExited(MouseEvent) 负责处理鼠标离开事件
mouseClicked(MouseEvent) 负责处理点击事件

2、使用MouseMotionListener接口处理鼠标事件
事件源发生的鼠标事件有2种：拖动鼠标和鼠标移动
鼠标事件的类型是MouseEvent
事件源获得监视器的方法是addMouseMotionListener()
处理事件源发生的事件的接口是MouseMotionListener 接口中有如下的方法
mouseDragged() 负责处理鼠标拖动事件
mouseMoved() 负责处理鼠标移动事件

3、控制鼠标的指针形状
setCursor(Cursor.getPreddfinedCursor(Cursor.鼠标形状定义)) 鼠标形状定义见（书 P 210）

4、键盘事件
键盘事件源使用addKeyListener 方法获得监视器
键盘事件的接口是KeyListener 接口中有3个方法
public void keyPressed(KeyEvent e) 按下键盘按键
public void keyReleased(KeyEvent e) 释放键盘按键
public void keyTypde(KeyEvent e) 按下又释放键盘按键
