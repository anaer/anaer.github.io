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
          (o.rows || []).forEach(str => {
            // 对同一groupid进行计数
            count[o.groupid] = count[o.groupid] + 1;
            // console.info("count[o.groupid]=", count[o.groupid]);
            let arr = str.split(' | ');
            let firstLetter = pinyinUtil.getFirstLetter(arr[0], true).join(' ');
            if (arr.length) {
              var favicon = '';
              var url = arr[1];
              if (url) {
                var domain = url.split('/');
                if(domain[2]){
                  if(url.startsWith('https')){
                    //favicon = "https://"+domain[2]+"/favicon.ico";
                    favicon = "https://ico.kucat.cn/get.php?url=https://"+domain[2];
                  }else{
                    //favicon = "http://"+domain[2]+"/favicon.ico";
                    favicon = "https://ico.kucat.cn/get.php?url=http://"+domain[2];
                  }
                }
              }
              let item = {
                // 缩写
                name: truncate(arr[0], 20),
                title: arr[0],
                href: arr[1],
                favicon: favicon,
                firstLetter: firstLetter,
                searchKey: arr.concat(o.title, firstLetter).join(' ')
              };
              links.push(item);
            }
          });
          if (o.groupid) {
            let tab = {
              title: o.title,
              rows: links.slice(start),
              // 如果未设置limit, 则默认为6, 同一组最多显示6条. 防止太长
              limit: o.limit || 6
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

/**
 * 截取字符串.
 *
 * @param {*} str 字符串
 * @param {*} limit 限制长度, 如果是中文, 再减4, 主要是中文宽度较宽
 * @returns
 */
function truncate(str, limit) {
  var chinese = RegExp('[\u4e00-\u9fa5]{0,}');
  if(str.length > limit){
    if(chinese.test(str) && (limit-4>0)){
        limit = limit -4;
    }
    return str.slice(0, limit) + '...';
  }else{
    return str;
  }
}

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
