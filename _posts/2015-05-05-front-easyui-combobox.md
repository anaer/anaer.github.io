---
layout: post
title: "easyui下拉框combobox"
description: "easyui下拉框combobox"
category:easyui
tags: [easyui, combobox]
---

#### 下拉框选项变更事件

```js
$(".dictFastQry").combobox({
    valueField : 'value',
    textField : 'text',
    editable : true,
    panelHeight : 'auto', // 面板宽度自适应
    formatter : formatItem, // 格式化下拉项
    data : d.rows.site_fast_qry,
    onChange:function(){
        alert('选中 !!!!');
    }
});
```


#### 多选属性multiple

multiple:true多选 multiple:false单选

<input class="easyui-combobox" id="xgr" name="xgr" style="width:435px" url='../Source/Public/json.ashx?action=zhymch'
data-options="valueField:'zhymch', textField:'zhymch',multiple:true,panelHeight:'auto'" >

#### combobox取值赋值
1. 单选赋值setValue
$("#visible").combobox("setValue", json.visible);
//取值
$("#visible").combobox("getValue");

2. 多选赋值setValues
多选key值是一个数组，$('#Id').combobox('setValues','key1,key2,key3'.split(','))
$("#status").combobox("getValues").join(',')
不带join 返回数组, 带join返回字符串
