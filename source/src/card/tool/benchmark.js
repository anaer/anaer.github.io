let m_util = require('common/util');

//var Benchmark = require("./source/lib/benchmark/benchmark.js");


var editor;
var view = $('<div class="am-container">' +
  '  <div class="am-g">' +
  '    <div data-selector="code" class="am-u-sm-8"></div>' +
  '    <div data-selector="tab_view" class="am-tab-panel  am-u-sm-4" style="min-height:200px">' +
  '    该检测基于benchmarkjs，<a href="http://benchmarkjs.com/docs" target="_blank">相关文档</a>' +
  '    </div>' +
  '  </div>' +
  '  <button data-selector="submit" type="button" class="am-btn am-btn-secondary" style="width:100%">执行</button>' +
  '  <iframe data-selector="benchmark" src="./source/lib/benchmark/index.html" style="display: none;"></iframe>' +
  '</div>');

var domCode = view.find('[data-selector="code"]');
var domSubmit = view.find('[data-selector="submit"]');
var domTabView = view.find('[data-selector="tab_view"]');



var worker = new Worker("./source/lib/benchmark/worker.js");
worker.onmessage = function (event) {
  var data = JSON.parse(event.data);
  /*domTabView.append('<div>' + data.msg + '</div>');
  if (data.status) {
      domSubmit.html('执行').on('click', submitFun);
  }*/
  console.info("worker: " + data.msg);
};

var PerformanceTesting;

function submitFun() {
  worker.postMessage(editor.getValue());
  if (!PerformanceTesting) {
    PerformanceTesting = view.find('[data-selector="benchmark"]')[0].contentWindow.PerformanceTesting;
  }
  PerformanceTesting(editor.getValue(), function (data) {
    domTabView.append('<div>' + data.msg + '</div>');
    if (data.status) {
      domSubmit.html('执行').on('click', submitFun);
    }
  });
  domTabView.html('');
  domSubmit.html('执行中。。。').off('click');
}
domSubmit.on('click', submitFun);

m_util.load(["./source/lib/codemirror/lib/codemirror.css",
    "./source/lib/codemirror/addon/hint/show-hint.css",
    "./source/lib/codemirror/lib/codemirror.js",
    "./source/lib/codemirror/addon/hint/show-hint.js",
    "./source/lib/codemirror/addon/hint/xml-hint.js",
    "./source/lib/codemirror/addon/hint/html-hint.js",
    "./source/lib/codemirror/mode/xml/xml.js",
    "./source/lib/codemirror/mode/javascript/javascript.js",
    "./source/lib/codemirror/mode/css/css.js",
    "./source/lib/codemirror/mode/htmlmixed/htmlmixed.js"
  ],
  function () {
    view.setView({
      end: function () {
        if (!editor) {
          editor = CodeMirror(domCode[0], {
            mode: "text/html",
            styleActiveLine: true,
            lineNumbers: true,
            lineWrapping: true,
            autofocus: true,
            extraKeys: {
              "Ctrl-1": "autocomplete"
            }
          });
          editor.setSize('100%', $(window).height() - 150);
          editor.setValue('[{\n' +
            '    name: "RegExp#test",\n' +
            '    fun: function() {\n' +
            '        /o/.test("Hello World!");\n' +
            '    }\n' +
            '}, {\n' +
            '    name: "String#indexOf",\n' +
            '    fun: function() {\n' +
            '        "Hello World!".indexOf("o") > -1;\n' +
            '    }\n' +
            '}, {\n' +
            '    name: "String#match",\n' +
            '    fun: function() {\n' +
            '        !!"Hello World!".match(/o/);\n' +
            '    }\n' +
            '}]');
        }
      }
    });
    view.reset();
  });


module.exports = view;
