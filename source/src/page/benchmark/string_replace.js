module.exports =
`
// replace的执行效率
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
