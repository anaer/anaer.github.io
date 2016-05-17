---
layout: post
title: "spsl SuperPutty 脚本语言"
description: "SuperPuTTY Scripting Language"
category:spsl
tags: [spsl]
---

#### 脚本实例

* 自动登录实现

```
#!/bin/spsl
SLEEP 1000
SENDLINE password
SENDKEY {ENTER}
```

#### 相关链接
* [SPSL Reference](https://github.com/jimradford/superputty/wiki/SPSL-Reference-(SuperPuTTY-Scripting-Language))