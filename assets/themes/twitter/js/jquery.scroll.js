//为避免冲突，将我们的方法用一个匿名方法包裹起来
(function($) {

    //扩展这个方法到jquery
    $.fn.extend({

        //插件名字
        scrollShow: function(options) {

            //设置默认值并用逗号隔开
            var defaults = {
                padding: 20,
                mouseOverColor : '#000000',
                mouseOutColor : '#ffffff'
            }

            var options =  $.extend(defaults, options);

            //遍历匹配元素的集合
            return this.each(function() {
                //在这里编写相应代码进行处理
                var o = options;
                alert(o.padding);

            });
        }
    });

 //传递jQuery到方法中，这样我们可以使用任何javascript中的变量来代替"$"
})(jQuery);
