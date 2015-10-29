---
layout: post
title: "shadowsocks安装"
description: ""
category: shadowsocks
tags: [shadowsocks]
---

1. shadowsocks安装
`sudo apt-get install shadowsocks`
2. 配置config.json
```json
{
  "server":"my_server_ip",
    "server_port":8388,
    "local_port":1080,
    "password":"fuckthegfw",
    "timeout":600,
    "method":"aes-256-cfb"
}
```
3. 执行shadowsocks
启动服务器:
`nohup ssserver > log &`

启动客户端:
`nohup sslocal -c config.json > ~/.logs/sdowsocks.log &`
