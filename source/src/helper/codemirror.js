const m_util = require('common/util');
const loadEvent = m_util.load([
    "./source/lib/codemirror/lib/codemirror.css",
    "./source/lib/codemirror/theme/tomorrow-night-bright.css",
    "./source/lib/codemirror/addon/hint/show-hint.css",
    "./source/lib/codemirror/lib/codemirror.js",
    "./source/lib/codemirror/mode/javascript/javascript.js",
    "./source/lib/codemirror/mode/css/css.js",
    "./source/lib/codemirror/mode/htmlmixed/htmlmixed.js",
    "./source/lib/codemirror/addon/hint/show-hint.js",
    "./source/lib/codemirror/addon/hint/javascript-hint.js",
    "./source/lib/codemirror/addon/hint/html-hint.js",
    "./source/lib/codemirror/addon/mode/simple.js",
    "./source/lib/codemirror/addon/display/autorefresh.js"
]).then(function(){
    BCD.addEvent('codemirror_formate', function(ele, option, data){
        let _dom = ele[0];
        console.log(data);
        _dom.codemirror = CodeMirror(_dom, {
          mode: option.mode || "simplemode",
          styleActiveLine: true,
          lineWrapping: true,
          lineNumbers: true,
          theme: 'tomorrow-night-bright',
          value: ele.html() || (data && data.code) || ""
        });

        setTimeout(function(){
            _dom.codemirror.setSize('auto', 'auto');
        }, 100);
    });
});

module.exports = loadEvent;
