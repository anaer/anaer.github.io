---
layout: post
title: "nodejs文件读取"
description: "nodejs文件读取"
category: nodejs
tags: [nodejs]
---

* 异步IO
fileread.js

```js
var fs = require('fs');
fs.readFile("hello.js", "UTF-8", function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

console.log("读取文件完毕...");
```

* 同步IO
filereadsync.js

```js
var fs = require('fs');
var data = fs.readFileSync("hello.js", "UTF-8");
console.log(data);
console.log("读取文件完毕...");
```
