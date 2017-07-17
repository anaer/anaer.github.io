module.exports =
`
// 白名单策略，最差的情况（对于数组是遍历完最后一个元素）
[{
    name: "RegExp#test",
    fun: function () {
        return /m=getSignInfo|sign/.test("//liquidliang.cc/ajax?aid=20&uid=791756267&t=1492498034551");
    }
}, {
    name: "RegExp#mutiple",
    fun: function () {
        return /m=getSignInfo|sign|m=getSignInfo|sign/.test("//liquidliang.cc/ajax?aid=20&uid=791756267&t=1492498034551");
    }
}, {
    name: "array#indexOf",
    fun: function () {
        return ['m=getSignInfo', 'sign', 'm=getSignInfo', 'sign'].some(function (o) {
            return "//liquidliang.cc/ajax?aid=20&uid=791756267&t=1492498034551".indexOf(o) > -1;
        });
    }
}, {
    name: "dict#indexOf",
    fun: function () {
        var dict = {
            'm=getSignInfo': 1,
            'sign': 1
        };
        for (var key in dict) {
            if ("//liquidliang.cc/ajax?aid=20&uid=791756267&t=1492498034551".indexOf(key) > -1) {
                return true;
            }
        }
        return false;
    }
}]
`;
