const m_util = require('common/util');
const m_search = require('helper/search');
let links = [];
let linkTab = {};
let count = [];

let getLinks = new Promise((resolve) => {
  BCD.ajaxCache('./json/link.json', function (data) {
    if (data.length) {
      m_util.load(['source/lib/pinyinjs/dict/pinyin_dict_firstletter.js',
        'source/lib/pinyinjs/pinyinUtil.js'
      ], () => {
        links = [];
        linkTab = [];
        count = [];
        data.forEach(o => {
          let start = links.length;
          // 如果count[o.groupid]不存在，则初始化为0
          if(!count[o.groupid]){
            count[o.groupid] = 0;
          }
          // 如果未设置limit, 则默认为6, 同一组最多显示6条. 防止太长
          let limit = o.limit || 6;
          (o.rows || []).forEach(str => {
            // 对同一groupid进行计数
            count[o.groupid] = count[o.groupid] + 1;
            console.info("count[o.groupid]=", count[o.groupid]);
            let arr = str.split(' | ');
            let firstLetter = pinyinUtil.getFirstLetter(arr[0], true).join(' ');
            if (arr.length) {
              var favicon = '';
              var url = arr[1];
              if (url) {
                var domain = url.split('/');
                if(domain[2]){
                  if(url.startsWith('https')){
                    favicon = "https://"+domain[2]+"/favicon.ico";
                  }else{
                    favicon = "http://"+domain[2]+"/favicon.ico";
                  }
                }
              }
              let item = {
                name: arr[0],
                href: arr[1],
                favicon: favicon,
                firstLetter: firstLetter,
                searchKey: arr.concat(o.title, firstLetter).join(' ')
              };
              // 判断是否设置limit限制, 如果设置了, 判断是否超过限制
              if(!limit || count[o.groupid]<=limit){
                links.push(item);
              }
            }
          });
          if (o.groupid) {
            let tab = {
              title: o.title,
              rows: links.slice(start)
            }
            if (linkTab[o.groupid]) {
              linkTab[o.groupid].push(tab);
            } else {
              linkTab[o.groupid] = [tab];
            }
          }
        });
        resolve(data);
      });
    }else{
      resolve(data);
    }
    return data.length ? 1 : 0;
  }, 0, 3E3, 1);
}).catch((e) => console.info(e));



//搜索直达
const searchDirect = (word) => {
  let reg = m_search.getGlobalRegex(word, 'i');
  let regGlobal = m_search.getGlobalRegex(word, 'ig');
  //console.log(reg);
  return links.filter(o => reg.test(o.searchKey)).map(o => {
    let weight = 0;
    let item = {
      href: o.href,
      name: o.name.replace(regGlobal, function ($0) {
        weight += 3 * $0.length;
        return '<span class="am-text-danger">' + $0 + '</span>';
      })
    };
    if (word.length > 1) {
      item.searchHref = o.href.replace(regGlobal, function ($0) {
        weight += $0.length;
        return '<span class="am-text-danger">' + $0 + '</span>';
      });
    } else {
      item.searchHref = o.href;
    }

    o.firstLetter.replace(regGlobal, function ($0) {
      weight += 2 * $0.length;
      return $0;
    });
    item.weight = weight
    return item;
  }).sort((a, b) => b.weight - a.weight).slice(0, 10);
};
module.exports = {
  getLinks,
  searchDirect,
  getLinksSync: () => links,
  getLinkTabSync: () => linkTab
};
