var m_util = require('common/util');
var editor;
var view = $('<div class="am-container">' +
  '   <div style="margin-top:20px"><div data-selector="code"  Columns="500"></div></div>' +
  '   <div data-am-widget="tabs" class="am-tabs am-tabs-default">' +
  '  <ul class="am-tabs-nav am-cf">' +
  '    <li data-selector="mod" class="am-active"><a>复制模板</a></li>' + // data-clipboard-target="fe_text"
  '    <li data-selector="remod" class="">按模板更新</li>' +
  '    <li data-selector="view" class=""><a>更新视图</a></li>' +
  '    <li data-selector="review" class="">按视图更新</li>' +
  '  </ul>' +
  '  <div class="am-tabs-bd">' +
  '    <div data-selector="tab_mod" class="am-tab-panel am-active"><textarea id="fe_text" data-selector="dis" class="am-form-field am-radius" rows="20" placeholder = "鼠标点此处生成"></textarea></div>' +
  '    <div data-selector="tab_view" class="am-tab-panel " style="min-height:200px"></div>' +
  '</div></div>');


var domCode = view.find('[data-selector="code"]');
var domDis = view.find('[data-selector="dis"]');
var domMod = view.find('[data-selector="mod"]');
var domView = view.find('[data-selector="view"]');
var domTabMod = view.find('[data-selector="tab_mod"]');
var domTabView = view.find('[data-selector="tab_view"]');


function refreshMod() {
  view.find('.am-tabs-nav li').removeClass('am-active');
  domMod.addClass('am-active');
  $(".am-tab-panel").removeClass('am-active');
  domTabMod.addClass('am-active');
  var txt = editor.getValue();
  domDis.val("        '" + txt.split('\n').join("'+\n        '") + "',");
}
domView.on('click', function () {
  view.find('.am-tabs-nav li').removeClass('am-active');
  domView.addClass('am-active');
  $(".am-tab-panel").removeClass('am-active');
  domTabView.addClass('am-active').html(editor.getValue());
});
view.find('[data-selector="review"]').on('click', function () {
  editor.setValue(domTabView.html().replace(/([^>])\n\s*/g, function ($0, $1) {
    return $1;
  }));
});
view.find('[data-selector="remod"]').on('click', function () {
  editor.setValue(domDis.val().replace(/^\s*'/, '').replace(/'\s*\+\s*\n\s*'/g, '\n').replace(/'[,\s\n+]*$/, ''));
});


m_util.load(["./source/lib/codemirror/lib/codemirror.css",
    "./source/lib/codemirror/addon/hint/show-hint.css",
    "./source/lib/codemirror/lib/codemirror.js",
    "./source/lib/codemirror/addon/hint/show-hint.js",
    "./source/lib/codemirror/addon/hint/xml-hint.js",
    "./source/lib/codemirror/addon/hint/html-hint.js",
    "./source/lib/codemirror/mode/xml/xml.js",
    "./source/lib/codemirror/mode/javascript/javascript.js",
    "./source/lib/codemirror/mode/css/css.js",
    "./source/lib/codemirror/mode/htmlmixed/htmlmixed.js",
    "./source/lib/zeroclipboard/ZeroClipboard.js"
  ],
  function () {
    ZeroClipboard.config({
      swfPath: "./source/lib/zeroclipboard/ZeroClipboard.swf",
      moviePath: "./source/lib/zeroclipboard/ZeroClipboard.swf"
    });
    var clip = new ZeroClipboard(domMod[0]);

    clip.on("ready", function () {
      this.on('copy', function (event) {
        refreshMod();
        event.clipboardData.setData('text/plain', domDis.val());
      });
      this.on("aftercopy", function (event) {
        m_util.toast('已复制到粘贴板');
      });
    });


    ZeroClipboard.setData("text/plain", 'txt');
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
        }
      }
    });
    view.reset();
  });
module.exports = view;
