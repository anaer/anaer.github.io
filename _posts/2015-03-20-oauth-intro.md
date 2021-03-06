---
layout: post
title: "OAuth 2.0介绍"
description: "OAuth 2.0介绍"
category:OAuth
tags: [OAuth]
---

#### Client 向 Resource Server 出示 Access Token 的方式
1. 放在 HTTP Header 里面

```
GET /resource HTTP/1.1
Host: server.example.com
Authorization: Bearer mF_9.B5f-4.1JqM
```

Resource Server 必须支援这个方式。

本段参考 Section 2.2

2. 放在 Request Body 里面（Form 之类的）

```
POST /resource HTTP/1.1
Host: server.example.com
Content-Type: application/x-www-form-urlencoded

access_token=mF_9.B5f-4.1JqM
```

前提：

Header 要有 Content-Type: application/x-www-form-urlencoded。
Body 格式要符合 W3C HTML 4.01 定义 application/x-www-form-urlencoded。
Body 要只有一个 part （不可以是 multipart）。
Body 要编码成只有 ASCII chars 的内容。
Request method 必须是一种有使用 request-body 的，也就是说不能用 GET 。

就是送表单嘛，但不可以是 multipart/form-data 这种（通常用来上传档案）。

Resource Server 可以但不一定要支援这个方式。

本段参考 Section 2.3

3. 放在 URI 里面的一个 Query Parameter （不建议）

规定要使用 access_token 这个 parameter ，例：

```
GET /resource?access_token=mF_9.B5f-4.1JqM HTTP/1.1
Host: server.example.com
```

然而因为 URL 可以被 proxy 抄走（如 log）或存在浏览器的历史记录里面，为了防 replay ，最好这样做：

Client 送 Cache-Control: no-store header
Server 回 2xx 的时候，送 Cache-Control: private header

Spec 不建议使用这种方法，如果真的没办法送 header 也没办法透过 request-body 送，再来考虑这种。

Resource Server 可以但不一定要支援这个方式。

本段参考 Section 2.4

### 参考
* [OAuth 2.0 笔记 (6) Bearer Token 的使用方法](http://blog.yorkxin.org/posts/2013/09/30/oauth2-6-bearer-token/)
