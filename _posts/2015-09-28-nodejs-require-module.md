---
layout: post
title: "nodejs 模块调用"
description: "nodejs模块调用"
category: nodejs
tags: [nodejs]
---

* 创建circle.js

```js
var PI = Math.PI;
// 方式1
exports.area = function(r) {
    return PI * r * r;
};

exports.circumference = function(r) {
    return 2 * PI * r;
};

// 方式2
adding = function(a, b) {
    return a+b;
};

exports.add = adding;

// 方式3
function multitt(a, b){
  return a*b;
  };

exports.multi = multitt;

```

* 创建app.js

```js
var circle = require('./circle.js');
console.log('The area of a circle of radius 4 is ' + circle.area(4));
console.log('1+2='+circle.add(1,2));
console.log('3*7='+circle.multi(3,7));
```

模块调用十分方便, 只需要require需要调用的文件即可.
在require了这个文件之后, 定义在exports对象上的方法便可以随意调用. Node.js将模块的定义和调用都封装得极其简单方便, 从API对用户友好这一角度来说, Node.js的模块机制是非常优秀的.
