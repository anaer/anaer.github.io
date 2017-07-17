module.exports =
`
// 各种数据初始化
[{
  name: "Object",
  fun: function () {
    var a = {};
  }
}, {
  name: "Object#new",
  fun: function () {
    var a = new Object();
  }
}, {
  name: "Object#new2",
  fun: function () {
    var a = new Object;
  }
}, {
  name: "String",
  fun: function () {
    var a = '';
  }
}, {
  name: "Array",
  fun: function () {
    var a = [];
  }
}, {
  name: "Array#new",
  fun: function () {
    var a = new Array;
  }
}, {
  name: "Array#new2",
  fun: function () {
    var a = new Array();
  }
}, {
  name: "Number",
  fun: function () {
    var a = 1.1;
  }
}, {
  name: "Boolean",
  fun: function () {
    var a = true;
  }
}, {
  name: "Boolean#Invert",
  fun: function () {
    var a = !0;
  }
}]
`;
