'use strict';

const path = require('path');
const koa = require('koa');
const logger = require('koa-logger');
const views = require('koa-views');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const onError = require('koa-onerror');

const app = koa();
onError(app);

// x-response-time

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.info('%s %s - %s ms', this.method, this.url, ms);
});

//////////////
// 业务逻辑 //
//////////////

// 静态目录
let staticPath = path.resolve(__dirname, '../');
console.info('static path:', staticPath);
app.use(koaStatic(staticPath));

const getServer = (port) => {
  app.host = process.env.IP || '0.0.0.0';
  app.port = process.env.PORT || port || 80;

  let server = app.listen(app.port, app.host, ()=>{
    console.log('Koa server listening on %s:%d', app.host, server.address().port);
  });
  return server;
};

if(module.parent){
  module.exports = getServer;
}else{
  getServer(8084);
}
