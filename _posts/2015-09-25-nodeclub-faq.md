---
layout: post
title: "nodeclub faq"
description: "nodeclub 常见问题"
category:nodejs
tags: [nodejs, nodeclub]

---

* Error: Cannot find module 'bson'
bson模块未安装
npm install bson

* E:\nodeclub-0.3.6\node_modules\mongoose\node_modules\mongodb\lib\mongodb\db.js:865
      || (selector['mapreduce'] && selector.out = 'inline')) {
selector.out == 'inline' 判断用==


* E:\nodeclub-0.3.6\node_modules\ndir\lib\ndir.js:166
  path.exists(parent, function(exists) {
       ^

TypeError: path.exists is not a function
当前版本path.exists为fs.exists


* 2015-09-24T22:22:10.923+0800 [conn34] AssertionException handling request, closing client connection: 10307 Client Error: bad object in message: bson length doesn't 
match what we found in object with unknown _id

bson版本不对
npm install bson@0.1.1


* E:\nodeclub-0.3.6\node_modules\mongoose\lib\drivers\node-mongodb-native\objectid.js:6
var ObjectId = require('mongodb').BSONPure.ObjectID;
                                          ^

TypeError: Cannot read property 'ObjectID' of undefined
mongodb版本不对 npm install mongodb@1.1.2

* module.js:338
    throw err;
    ^

Error: Cannot find module 'hooks'

安装hooks模块 npm install hooks@0.2.1
