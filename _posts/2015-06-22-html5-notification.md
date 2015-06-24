---
layout: post
title: "Firefox的桌面通知"
description: "Firefox的桌面通知"
category:Firefox
tags: [Firefox]

---

#### 桌面通知代码

```
/**
 * 桌面提醒
 * 浏览器: Firefox, Chrome
 */
function notifyMe(title, msg) {
    var options = {
        lang : 'zh-CN',
        body : msg
    };

    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    else if (Notification.permission === "granted") {
        var notification = new Notification(title, options);
    }

    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
            if (permission === "granted") {
                var notification = new Notification(title, options);
                notification.onshow = function () {
                    setTimeout(function () { notification.close(); }, 20000);
                   };
            }
        });
    }

}
```

#### 关闭超时时间设置

```
var notification = new Notification(title, options);
notification.onshow = function () {
    setTimeout(function () { notification.close(); }, 20000);
};
```

### 参考
* [html5 Notification 桌面通知](http://www.thinksaas.cn/group/topic/347544/)
