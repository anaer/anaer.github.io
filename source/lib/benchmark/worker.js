importScripts("./lodash.js", "./platform.js", "./benchmark.js");

function send(data){
    postMessage(JSON.stringify(data));
}

function PerformanceTesting(arr) {
    var suite = new Benchmark.Suite();
    var str = '';
    arr.forEach(function(item) {
        suite.add(item.name, item.fun); // add tests
    });
    suite.on('cycle', function(event) { // add listeners
            send({
                msg: String(event.target)
            });
        }).on('complete', function() {
            send({
                msg: '最快的方法是： ' + this.filter('fastest').map('name').join('<br>'),
                status: 1
            });
        })
        // run async
        .run({
            'async': true
        });
}

onmessage = function(evt) {
    var data = evt.data;
    var arr = [];
    eval('arr=' + data);
    PerformanceTesting(arr);
};
