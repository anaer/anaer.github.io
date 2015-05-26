---
layout: post
title: "Eclipse使用Jrebel进行热部署"
description: ""
category: Eclipse 
tags: [Eclipse, Jrebel]
---

#### 下载Jrebel 
    这个网上搜下, 有很多破解版的, 比如:
    http://download.csdn.net/detail/xiaobinxiaobinaini/8143863
    http://download.csdn.net/download/a315157973/8303799
    
#### Jrebel配置

    在Servers启动的配置中,在VM arguments中添加如下配置
    -noverify -javaagent:C:\Users\Administrator\Desktop\jrebel6.0.0-crack\jrebel.jar
    -Drebel.spring_plugin=true
    -Drebel.struts2-plugin=true

    上述参数的相关说明：
    -agentpath:  这个是你使用的JRebel Agent版本的lib包的路径(路径后缀不要写成jrebel.jar)，注意其中的斜线方向。
    -Drebel.dirs ：这个是你要监控的项目的 class 文件路径
    -Drebel.disable_update: 设为true,就不会联网检查更新
    -DJAVA_OPTS: 这个选项不是必须，当内存溢出的时候或其它特殊情况下才需要设置它的参数大小。
    
#### rebel.xml 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.zeroturnaround.com"
    xsi:schemaLocation="http://www.zeroturnaround.com http://www.zeroturnaround.com/alderaan/rebel-2_0.xsd">

    <classpath>
        <dir name="D:/anaer/myweb/target/classes">
        </dir>
    </classpath>

    <web>
        <link target="/">
            <dir name="D:/anaer/myweb/target/m2e-wtp/web-resources">
            </dir>
        </link>
        <link target="/">
            <dir name="D:/anaer/myweb/src/main/webapp">
            </dir>
        </link>
    </web>

</application>
```