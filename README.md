博客模板修改自[Yonsm.NET](http://www.yonsm.net) 的博客

* 添加友言评论
  _config.yml 添加 uyan项
  _include\comments.md 添加uyan内容
  
* 添加prettify语法高亮
  media\css\prettify.css 增加
  media\css\prettify.js 增加
  _layouts\default.html中body标签闭合前添加添加
    <script>
        $(function() {
            $('pre').addClass('prettyprint linenums').css('overflow-x', 'auto');
            window.prettyPrint && prettyPrint();
        });
    </script>