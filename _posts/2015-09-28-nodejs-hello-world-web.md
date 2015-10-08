---
layout: post
title: "nodejs web版 Hello World"
description: ""
category: nodejs
tags: [nodejs]
---

* 创建脚本helloworld.js

```js
var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello World\n');
}).listen(80, "127.0.0.1");

console.log('Server running at http://127.0.0.1');
```

* 执行脚本

```sh
>node helloworld.js
打开浏览器 访问http://127.0.0.1, 页面打印Hello World
```

上面的代码搭建了一个简单的http服务器, 在本地监听80端口, 对任意的http请求, 服务器都返回一个头部状态码为200、Content-Type值为'text/plain'的"Hello World"文字响应.

1) Node.js的网络编程比较便利, 提供的模块开放了容易上手的API借口, 短短几行代码就可以构建服务器.
2) 体现了事件驱动、异步编程, 在createServer函数的参数中指定了一个回调函数(采用Javascript的匿名函数实现), 当有http请求发送过来时, Node.js就会调用该回调函数来处理请求并响应.
