const benchDict = {
    string_match: require('page/benchmark/string_match.js'),
    string_plus__vs__array_push: require('page/benchmark/string_plus__vs__array_push.js'),
    white_list_good: require('page/benchmark/white_list_good.js'),
    white_list_bad: require('page/benchmark/white_list_bad.js'),
    initial: require('page/benchmark/initial.js')
};

let configs = [{
    title: '字符串相关',
    rows: ['string_match', 'string_plus__vs__array_push', {
      name:'string-startswith',
      href: 'https://jsperf.com/string-startswith/48'
    }]
},{
    title: '数据结构',
    rows: ['initial', 'white_list_good', 'white_list_bad']
}, {
   title: '数组相关',
   rows:[{
     name: 'for vs map vs foreach vs reduce',
     href: 'https://jsperf.com/for-map-foreach-reduce'
   }]
}];




let j = 0;
let daohangList = [];
let pathname = "./benchmark.html";

configs.forEach((item, i)=>{
    if(!daohangList[j]){
        daohangList[j] = [];
    }
    daohangList[j].push({
        title: item.title,
        rows: item.rows.map(key=>{
            return BCD.is.o(key) ? key : {
                name: key,
                href: pathname + location.search + '#!/'+key
            };
        })
    });
    if(i%2==1){
        j++;
    }
});

module.exports = {
  benchDict,
  daohangList
};
