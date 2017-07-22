module.exports =
`
// split的执行效率
[{
  name: "RegExp#replace",
  fun: function () {
    return "%y%M%d%h%m%s".replace(new RegExp('h'+'.*$'),'h');
  }
}, {
  name: "String#split",
  fun: function () {
    var arr = "%y%M%d%h%m%s".split('h');
    return arr[1] ? arr[0]+'h' : arr[0];
  }
}, {
  name: "String#indexOf",
  fun: function () {
    var s = "%y%M%d%h%m%s";
    return s.substring(0, (s.indexOf('h') + 1)||12);
  }
}]
`;
