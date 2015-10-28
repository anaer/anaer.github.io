---
layout: post
title: "Firefox浏览器优化设置"
desc: "Firefox浏览器优化设置"
category:Firefox
tags: [Firefox]
---

### Firefox定制

#### 使用自定义配置启动

```bat
#Firefox.bat
start firefox.exe -profile "Profile"

桌面快捷方式
"D:\Program Files\Mozilla Firefox\firefox.exe" -profile Profile
```
#### Ubuntu指定firefox默认配置目录
修改配置文件 .mozilla/firefox/profiles.ini

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

#### Windows下设置firefox默认配置目录
启动firefox时,使用firefox -p打开配置模式, 在这里设置默认配置目录

### 参考
#### 油猴脚本
* [Greasy Fork](https://greasyfork.org/)
* [Userscripts](http://userscripts-mirror.org/)
* [OpenUserJS](https://openuserjs.org/)

#### 推荐插件
* [34款Firefox渗透测试插件](http://www.freebuf.com/tools/5361.html)

#### Firefox 开发
* [Firefox 桌面提示](https://developer.mozilla.org/en-US/docs/Web/API/notification)

#### Firefox精简
* [关于精简profile...](http://mozilla.com.cn/thread-34828-1-1.html)
* [关于精简profile（第二部）](http://mozilla.com.cn/thread-34829-1-1.html)
