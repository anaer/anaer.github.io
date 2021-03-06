---
layout: post
title: "easyui前端UI"
description: "easyui前端UI"
category:ui
tags: [easyui]
---

#### easyui-datagrid冻结列设置

   1. 需要设置table标签的fitColumns="false"
   2. 将要冻结的列独立一个thead,并且设置data-options="frozen:true"

```jsp
    <table id="dg" title="title" class="easyui-datagrid"  collapsible="true" url="select.json" toolbar="#toolbar" pagination="true" pageSize="20" pageList="[20,50,100,500,1000]" rownumbers="true" fitColumns="false" singleSelect="true">
        <thead data-options="frozen:true">
            <tr>
                <th field="f1" width="50" sortable="true" >f1</th>
                <th field="f2" width="250" sortable="true">f2</th>
            </tr>
        </thead>
        <thead>
            <tr>
                <th field="f3" width="250" sortable="true" >f3</th>
                <th field="f4" width="120" sortable="true">f4</th>
            </tr>
        </thead>
    </table>
```


#### combobox 下拉框实现

```js
 $.ajax({
    url : '/myweb/dict/list.do',
    data : {
        name : 'book_status'
    },
    async : false,
    success : function(d) {
        $(".dictStatus").combobox({
            valueField : 'value',
            textField : 'text',
            editable : true,
            panelHeight: 'auto', // 面板宽度自适应
            formatter: formatItem, // 格式化下拉项
            data : d.rows
        });
    }
});

/**
 * combobox 下拉显示 格式化
 * @param row
 * @returns {String}
 */
function formatItem(row){
    var s = '<span style="font-weight:bold">' + row.value + '</span> - <span style="color:#888">' + row.text + '</span>';
    return s;
}
```

#### 遍历json数组

```js
  $.each(obj, function (n, value) {
      alert(n + ' ' + value);
      var trs = "";
      trs += "<tr><td>" + value.name + "</td> <td>" + value.password + "</td></tr>";
      tbody += trs;
  });
```

### 参考
* [使用Jquery+EasyUI进行框架项目开发案例讲解之一---员工管理源码分享 ](http://blog.csdn.net/chinahuyong/article/details/11926719)
* [【EasyUI】Combobox用法总结](http://my.oschina.net/yamt/blog/371928)
* [easyUI属性汇总](http://my.oschina.net/wfire/blog/138545)
