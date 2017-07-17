module.exports =
`
// 是否包含某些字符串
[{
  name: "RegExp#test",
  fun: function () {
    /o/.test("Hello World!");
  }
}, {
  name: "String#indexOf",
  fun: function () {
    "Hello World!".indexOf("o") > -1;
  }
}, {
  name: "String#match",
  fun: function () {
    !!"Hello World!".match(/o/);
  }
}]
`;
