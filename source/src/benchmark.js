/**
 * @file benchmark 入口文件，路由定义
 * @author ljquan@qq.com
 */

const m_util = require('common/util');
const m_loading = require('card/common/loading');
require('helper/common_event'); //注册公共指令
require('css/benchmark.css');
const m_codemirror = require('helper/codemirror.js');
require('helper/benchmark.js');
const c_daohang = require('card/common/daohang');
const m_benchmark = require('model/benchmark.js');


//入口
BCD.app({
    initPage: function(key, next) {
        m_loading.show();
        let page = this;
        switch (key) {
            case 'link':
                c_daohang(page, m_benchmark.daohangList);
                next();
                break;
            default:
                if(m_benchmark.benchDict[key]){
                    m_codemirror.then(function(){
                        page.setView({
                            title: key,
                            source: {
                                code: m_benchmark.benchDict[key]
                            },
                            template: '<div class="am-g">'+
                            '<div data-codemirror class="am-u-lg-8 am-u-sm-12" data-on="?m=codemirror_formate&mode=javascript"></div>'+
                            '<div class="am-margin-top-lg am-u-lg-4 am-u-sm-12">'+
                            '<div class="am-panel am-panel-default">'+
                            '  <div class="am-panel-hd">结果</div>'+
                            '  <div data-benchmark class="am-panel-bd" data-on="?m=run_benchmark"></div>'+
                            '</div></div>'+
                            '</div>',
                            end: function(){
                                let domBenchmark = this.find('[data-benchmark]');
                                let domCode = this.find('[data-codemirror]')[0];
                                if(domCode && domCode.codemirror){
                                    domCode.codemirror.on('blur', function(cm, obj){
                                        domBenchmark.trigger('codemirror_blur', domCode.codemirror.getValue());
                                    });
                                }
                            }
                        });
                        next();
                    });
                    return;
                }
                BCD.replaceHash('#!/link');
                next(-1);
                break;
        }
    }
});
