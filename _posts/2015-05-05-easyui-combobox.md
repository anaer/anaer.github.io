---
layout: post
title: "easyui combobox"
description: "easyui combobox"
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

#### combobox取值赋值

```js
//赋值
$("#visible").combobox("setValue", json.visible);
//取值
$("#visible").combobox("getValue");
```