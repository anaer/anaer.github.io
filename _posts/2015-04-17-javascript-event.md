---
layout: post
title: "js 事件"
description: "js 事件"
category:javascript
tags: [javascript]

---

#### js 自动任务代码

    // 定义checkbox id=autoRefresh
    // doSearch() 为需要定时执行的方法
    // setInterval 设置定时任务 
    // clearInterval 取消定时任务
    // 5000 定时执行时间 单位毫秒
    var ref="";
    $("#autoRefresh").click(function(e){
        if(this.checked){
            alert("自动刷新");
            ref = setInterval(function(){
                doSearch();
            },5000);
        }else{
            alert("取消自动刷新")
            clearInterval(ref);
        }
    });
    
    
#### js 日志打印

    var C;
    toggleConsole(Config.debug);
    
    function toggleConsole(debug) {
        if (debug) {
            C = console;
        } else {
            C = {
                log: nullFn,
                debug: nullFn,
                error: nullFn,
                group: nullFn,
                groupCollapsed: nullFn,
                groupEnd: nullFn,
                time: nullFn,
                timeEnd: nullFn,
            };
        }
    }