var version = 'v2';
var namePrefix = 'cache-';
var nameReg = new RegExp('^' + namePrefix);
var businessKey = 'business-' + version;
var businessCacheName = namePrefix + businessKey;
var libCacheName = namePrefix + 'lib-' + version;
var imageCacheName = namePrefix + 'image';

var expectedCaches = [
  businessCacheName, //业务代码  对于开发者常变，先用缓存，同时更新，下次进来再用新的(更新不需要改version)。
  libCacheName, //各种引用库的资源 不常变，可以通过更改version实现更新。
  imageCacheName //图片资源，由于没办法完全从链接判断是否为图片，回包后再判断是否为图片，然后缓存
];
//正则匹配缓存文件
var regDict = {};
regDict[libCacheName] = /source\/lib|\.woff$|\.woff2$|\.ico$/;
regDict[businessCacheName] = /source\/dist/;

//安装文件
var FILES = [
  './',
  './index.html',
  './source/lib/bcd.min.js',
  './source/dist/index.js'
];
var pathname = (self.location && location.pathname) || '/';
var FILEPATHS = FILES.map(function(path){
  return pathname.replace(/\/[^\/]*$/, '') + path.substr(1);
});
var consoleList = [];

var matchAll = self.clients.matchAll || function(){
    return self.clients.getAll.call(self.clients);//低版本TBS，没有matchAll
};

self.addEventListener('install', function (event) {
  console.log('[ServiceWorker] Installed version ='+ version);
  event.waitUntil(caches.open(businessCacheName).then(function (cache) {
    return cache.addAll(FILES);
  }).then(function () {
    console.log('[ServiceWorker] Skip waiting on install');
    return self.skipWaiting();
  }));
});

self.addEventListener('activate', function (event) {
  matchAll.call(clients, {
    includeUncontrolled: true
  }).then(function (clientList) {
    var urls = clientList.map(function (client) {
      return client.url;
    });
    //如果新sw生效，对其他页面造成影响，这里可以查
    console.log('[ServiceWorker] Matching clients:', urls.join(', '));
  });

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // 删除掉当前定义前缀中不在expectedCaches中的缓存集
          if (nameReg.test(cacheName) && expectedCaches.indexOf(cacheName) == -1) {
            console.log('[ServiceWorker] Deleting old cache: '+ cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function () {
      //使service worker立马生效，在单页面应用中，这样是合理的
      console.log('[ServiceWorker] Claiming clients for version ' + version);
      return self.clients.claim();
    }));
});

var getNoSearch = function (url) {
  return url.replace(/\?[^?]+/, '');
}

function _fetch(url, timeout) {
  var abort_fn = null;
  var fetch_promise = fetch(url);

  //这是一个可以被reject的promise
  var abort_promise = new Promise(function (resolve, reject) {
    abort_fn = function () {
      reject(new Error('[sw] fetch timeout!'));
    };
  });

  //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  var abortable_promise = Promise.race([
    fetch_promise,
    abort_promise
  ]);

  setTimeout(function () {
    abort_fn();
  }, timeout || 2E3);

  return abortable_promise;
}
//更新缓存
var addToCache = function (dbName, req, response) {
  console.log('[sw] addToCache fetch:' + req.url);
  return _fetch(req.clone()).then(function (resp) {
    if (resp.type !== 'basic' && resp.type !== 'cors') {
      return resp;
    }

    if (resp.status !== 200) {
      throw new Error('response status is ' + resp.status);
    }
    var contentType = resp.headers.get('content-type');
    if (contentType.indexOf('text/html') > -1) {
      //避免缓存了上网时需要先登录的页面
      var arr = req.url.match(/\.[a-z]+$/);
      if (arr) {
        var ext = arr[0].substr(1);
        if (ext != 'html') {
          throw new Error('response content-type is ' + contentType);
        }
      }
    }

    var cacheResp = resp.clone();
    if (dbName === imageCacheName && !/^image\//.test(contentType)) {
      return resp;
    }
    caches.open(dbName).then(function (cache) {
      //删除旧文件
      cache.keys().then(function (oldReqList) {
        if (req.url.indexOf('?') > 0) {
          var urlKey = getNoSearch(req.url) + '?';
          oldReqList.filter(function(oldReq) {
            return oldReq.url.indexOf(urlKey) > -1;
          }).forEach(function(oldReq) {
            cache.delete(oldReq);
          });
        }
        console.log('[sw] caches.open '+ dbName +' cache.put:' + req.url);
        //添加新文件
        cache.put(req.clone(), cacheResp);
      });
    });

    return resp;
  }).catch(function (error) {
    if (response) { //请求失败用缓存保底
      console.log('[ServiceWorker] fetch failed ('+req.url+') and use cache ' +  error.stack);
      return response;
    } else {
      console.log('[sw] caches.open ' + dbName + ' get url = '+ req.url);
      return caches.open(dbName).then(function (cache) {
        //取旧缓存
        var urlKey = getNoSearch(req.url);
        return cache.keys().then(function (oldReqList) {
          var oldReq;
          while (oldReq = oldReqList.pop()) {
            if (oldReq.url.indexOf(urlKey) > -1) {
              console.log('[sw] cache.match oldReq url = '+ req.url);
              return cache.match(oldReq)
            }
          }
          return null;
        });
      }).then(function (resp) {
        if (resp) {
          console.log('[ServiceWorker] fetch failed ('+req.url+') and use old cache ' + error.stack);
          return resp;
        }
        // Respond with a 400 "Bad Request" status.
        console.log('[ServiceWorker] fetch failed ('+req.url+') ' + error.stack);
        return new Response(new Blob, {
          'status': 400,
          'statusText': 'Bad Request'
        });
      });
    }
  });
};


var fetchCache = function (dbName, req) {
  console.log('[sw] fetchCache:' + req.url);
  return caches.open(dbName).then(function (cache) {
    return cache.match(req.clone());
  }).then(function (response) {
    if (response) {
       console.log('[sw] fetchCache dbName='+dbName+' cache.match:' + req.url);
      if (dbName == businessCacheName) {
        addToCache(dbName, req, response); //更新缓存，下次使用
      }
      return response; //如果命中缓存，直接使用缓存.
    } else {
      return addToCache(dbName, req);
    }
  }).catch(function (e) {
    console.log('[sw]'+ e.stack);
    return addToCache(dbName, req);
  });
}

self.addEventListener('fetch', function (event) {

  var req, url = event.request.url;
  var requestURL = new URL(url);
  console.log('[sw] addEventListener fetch ' + url);

  if (requestURL.search.indexOf('cors=1') !== -1) {
    req = new Request(url, {
      mode: 'cors'
    });
  } else {
    req = event.request.clone();
  }
  console.log('[sw] requestURL.pathname='+requestURL.pathname);
  if (FILEPATHS.indexOf(requestURL.pathname) > -1) {
    return event.respondWith(fetchCache(businessCacheName, req));
  }

  for (var dbName in regDict) {
    if (regDict[dbName].test(url)) {
      return event.respondWith(fetchCache(dbName, req));
    }
  }

  if(/\.json$/.test(url)){
      return event.respondWith(fetch(req));
  }

  // 过虑github上 发布的其他项目
  if(/active-forks/.test(url)){
      return event.respondWith(fetch(req));
  }
  
  if(/Sub/.test(url)){
      return event.respondWith(fetch(req));
  }
  
  if(/Meow/.test(url)){
      return event.respondWith(fetch(req));
  }

  if (requestURL.protocol != 'https:') {
    return;
  }

  return event.respondWith(fetchCache(imageCacheName, req));

});
