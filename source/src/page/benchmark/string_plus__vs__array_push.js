module.exports =
`
// 字符串拼接形式, 模拟模板函数，一般模板大约需要拼接30段字符串
// 需要拼接的字符串长度越长，字符串的方式越明显，push多个并不会有优势
[{
  name: "string plus",
  fun: function () {
    var str = "";
    for(var i=10000; i<10030; i++){
      str += i.toString();
    }
    return str;
  }
}, {
  name: "array push",
  fun: function () {
    var arr = [];
    for(var i=10000; i<10030; i++){
      arr.push(i.toString());
    }
    return arr.join('');
  }
}, {
  name: "array push multiple",
  fun: function () {
    var arr = [];
    for(var i=10000; i<10030; i++){
      arr.push(i.toString(), (i++).toString(), (i++).toString(), (i++).toString(), (i++).toString());
    }
    return arr.join('');
  }
}]
`;

// Benchmark.prototype.setup = function(){
//   var str = "";
//   var arr = [];
// };
