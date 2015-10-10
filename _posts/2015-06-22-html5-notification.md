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

#### W3C标准的Notification
1. 创建桌面提醒
```
object Notification(
 string title,           // 标题
  {
       string iconUrl,   // 图标地址
       string body,      // 内容
       string tag        // 通过这个tag来实现单例：single instance
  }
)
```

2. 支持的事件
```
void ondisplay()        // 显示前触发
void onshow()           // 显示后触发
void onclick()          // 点击时候触发
void onerror()          // 错误时候触发
void onclose()          // 关闭时候触发
```

3. 支持的方法
```
void show()            // 错误时候触发
void cancel()          // 关闭
void close()           // 关闭
```

### 参考
* [w3 notifications文档](http://www.w3.org/TR/notifications/)
* [html5 Notification 桌面通知](http://www.thinksaas.cn/group/topic/347544/)
