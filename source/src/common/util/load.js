let scriptDict = {};
window.LOAD_CALLBACK = function (ele, callback) {
  console.log(arguments);
};

module.exports = function (list, callback) {
  let promiseLoad = new Promise(function(resolve){
     if(!callback){
         callback = resolve;
     }
  });
  let head = document.getElementsByTagName('head')[0];
  let loadList = [];
  if (BCD.is.s(list)) {
    list = [list];
  }
  list = list.map(src => {
    src = BCD.url.abs(src);
    if (!scriptDict[src]) {
      loadList.push(src);
    }
    return src;
  });

  if(loadList.length){
    loadList.forEach(src =>{
      let loadDom;
      if (/\.js$/.test(src)) {
        loadDom = document.createElement('script');
        loadDom.type = 'text/javascript';
        loadDom.charset = 'utf-8';
        loadDom.async = false;
        loadDom.src = src;
      } else {
        loadDom = document.createElement('link');
        loadDom.rel = 'stylesheet';
        loadDom.href = src;
      }

      loadDom.onload = function () {
        scriptDict[src] = true;
        if (loadList.every(src => scriptDict[src])) {
          callback(list.map(src=>scriptDict[src]));
        }
      };
      head.appendChild(loadDom);
    });
  }else{
    callback(list.map(src=>scriptDict[src]));
  }
  return promiseLoad;
}
