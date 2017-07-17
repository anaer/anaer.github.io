BCD.addEvent('run_benchmark', function(ele, option, data) {
  var running = true;
  var worker = new Worker("./source/lib/benchmark/worker.js");
  ele.html('<div data-tips>正在执行，请稍候</div>');
  var domTip = ele.find('[data-tips]');
  worker.onmessage = function(event) {
    var data = JSON.parse(event.data);
    ele.append('<div data-result>' + data.msg + '</div>');
    if (data.status === 1) {
      running = false;
      domTip.hide();
    }
    console.info("worker: ", data);
  };
  worker.postMessage(data.code);
  ele.on('codemirror_blur', function(ev, code) {
    console.log('running', running);
    if (running === false) {
      running = true;
      domTip.show();
      ele.find('[data-result]').remove();
      worker.postMessage(code);
    }
  });
});
