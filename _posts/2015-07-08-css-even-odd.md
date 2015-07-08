---
layout: post
title: "css中奇偶行获取"
description: "css中奇偶行获取"
category:css
tags: [css]

---

#### 获取奇偶行

```css
tr:nth-child(even) {background: #CCC}
tr:nth-child(odd) {background: #FFF}
```

#### 自定义规则
获取3,8,13...行

```css
li:nth-child(5n+3) {font-weight: bold}
```

