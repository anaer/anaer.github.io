---
layout: post
title: "在Cygwin下配置jekyll搭建Github博客"
description: "本站部署教程"
category: Github
tags: [Github, jekyll]
---

#### 安装jekyll
  如果是要直接发布到github上的, 可以不用安装jekyll, 直接进行第二步.

* 安装Cygwin
  下载cygwin安装程序, 根据步骤进行安装即可.

* 安装apt-cyg工具
  命令行安装脚本, 可以不通过该脚本直接使用Cygwin的setup程序进行安装
  [apt-cyg](https://github.com/transcode-open/apt-cyg)

```bash
svn --force export http://apt-cyg.googlecode.com/svn/trunk/ /bin/
chmod +x /bin/apt-cyg
```

* 安装Ruby

```bash
apt-cyg install Ruby
```

* 安装[gem](http://rubygems.org/pages/download)
  实际安装的时候, 最好到官网找下最新版本

```bash
$ wget http://production.cf.rubygems.org/rubygems/rubygems-1.8.24.tgz
$ tar xf rubygems-1.8.24.tgz
$ cd rubygems-1.8.24
$ ruby setup.rb
```

* 安装jekyll以及其他依赖
默认源可能安装不了, 可更换为taobao的源, 具体参看ruby.md

```bash
$ gem instal -V jekyll RedCloth rdiscount
```

#### 配置blog

* git clone [jekyll-bootstrap](https://github.com/plusjade/jekyll-bootstrap)并启动服务
  服务地址: http://127.0.0.1:4000/

```bash
$ git clone git://github.com/plusjade/jekyll-bootstrap.git ~/anaer.github.com
$ cd anaer.github.com
$ jekyll server
```

* 修改配置文件 `_config.yml` 大致如下:

```yml
title : My Blog :)
tagline: Go...
author :
    name : anaer
    email : anaer@email.test
    github : anaer
production_url : http://anaer.github.io
```

* 使用自己的域名, github默认提供的是二级域名(anaer.github.io)

```bash
$ cd anaer.githubio.
$ echo "anaer.github.io" > CNAME
```

* 注册 [disqus](http://disqus.com/) 帐号,然后再修改``_config.yml``:

```yml
comments :
  provider : disqus
  disqus :
    short_name : anaer
```

#### 部署问题解决

* jekyll 2.2.0 | Error:  incompatible character encodings: UTF-8 and GBK

```bash
# 设置编码
export LANG="en_US.UTF-8"
export LC_ALL="en_US.UTF-8"
```

* jekyll 启动错误: invalid byte sequence in UTF-8 (ArgumentError)
  本机测试发现只要保证文件格式为Unix UTF-8即可

### 语法高亮配置
#### 使用pygments

* 修改`_config.yml`, 应用语法高亮功能
  设置highlighter: pygments

* 选择一种样式，应用在Jekyll中

```bash
cd anaer.github.io/assets/themes/twitter/css
pygmentize -S native -f html > pygments.css, "native"是样式名，"html"是formatter
```

  在layout中引用刚刚加的pygments.css

```html
<!--anaer.github.io/_includes/themes/twitter/default.html添加:-->
<link href="{{ ASSET_PATH }}/css/pygments.css" rel="stylesheet" type="text/css" media="all">
```

* 语法高亮用法

```html
{% highlight java linenos %}
public class HelloWorld {
    public static void main(String args[]) {
      System.out.println("Hello World!");
    }
}
{% endhighlight %}
```

#### 使用google-code-prettify

* [下载prettify.js和prettify.css](https://code.google.com/p/google-code-prettify/)
* 将下载好的js和css, 丢到anaer.github.io\assets\themes\twitter\js和anaer.github.io\assets\themes\twitter\css目录下
* 在页面中加载js和css

```html
<!-- anaer.github.io/_includes/themes/twitter/default.html -->
<link href="{{ ASSET_PATH }}/css/prettify.css" rel="stylesheet" type="text/css">
<script src="{{ ASSET_PATH }}/js/prettify.js"></script>

<!-- 在body闭合之前添加<script> -->
// 语法高亮
$(function() {
    $('pre').addClass('prettyprint linenums').css('overflow-x', 'auto');
    window.prettyPrint && prettyPrint();
});

<!-- 默认只显示第5、10、15…行
     修改之前的prettify.css中的内容
     li.L0,li.L1,li.L2,li.L3,li.L5,li.L6,li.L7,li.L8{list-style-type:decimal}
-->
```

### Rake工具

* Rake创建post

```ruby
$ rake post title="Hello World"
Creating new post: ./_posts/2014-08-15-hello-world.md
//默认post扩展名为textile, 可以编辑Rakefile文件修改post_ext为md

$ rake page name="about.md"
mkdir -p .
Creating new page: ./about.md

$ rake page name="pages/about.md"
mkdir -p ./pages
Creating new page: ./pages/about.md

$ rake page name="pages/about"
mkdir -p ./pages/about
Creating new page: ./pages/about/index.html
```

* 切换主题

```ruby
rake theme:switch name="twitter"
```

### 添加社会化评论系统

* 默认disqus
* 中文社会化评论系统
[友言](http://www.uyan.cc/index.php)
[畅言](http://changyan.sohu.com)
[多说](http://duoshuo.com/)
[评论啦](http://www.pinglun.la/)

#### 添加友言

##### 方法一：直接将友言提供的通用代码添加到模板

```html
<!-- anaer.github.io/_includes/themes/twitter/default.html -->
<!-- 添加到content内容div后面即可 -->
<!-- UY BEGIN -->
<div id="uyan_frame"></div>
<script type="text/javascript" src="http://v2.uyan.cc/code/uyan.js?uid=1958077"></script>
<!-- UY END -->
```

##### 方法二: 使用配置文件
* 添加comments-providers

```html
<!-- anaer.github.io/_includes/JB/comments-providers下添加uyan  -->
<div id="uyan_frame"></div>
<script type="text/javascript">
    var uyan_uid = '{{ site.JB.comments.uyan.uid }}';
    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var uyan = document.createElement('script'); uyan.type = 'text/javascript'; uyan.async = true;
        uyan.src = 'http://v2.uyan.cc/code/uyan.js?uid='+uyan_uid;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(uyan);
    })();
</script>
```

* 添加comments配置
```html
<!-- anaer.github.io/_includes/JB/comments -->
<!-- {+% 那个会被github解析成Liquid tag进行处理, 不了解Liquid tag, 所以直接加了横线过滤 -->
{-% when "uyan" %-}
{-% include JB/comments-providers/uyan %-}
```

* 修改_config.yml

```yml
comments :
  provider : uyan
  uyan:
    uid : 1958077
```

### 添加目录toc

#### jekyll-toc-generator
 [jekyll-toc-generator](https://github.com/dafi/jekyll-toc-generator)
  Github pages can't use plugins, Github不支持这个插件，所以用下面这个

#### TOC Generator for Markdown

  [TOC Generator for Markdown](https://github.com/dafi/tocmd-generator)
* 安装步骤:
1. Download ZIP
2. 将js/css放到使用的主题目录下

```
anaer.github.io\assets\themes\twitter\js
anaer.github.io\assets\themes\twitter\css
```

3. 引入js

```js
  <!-- anaer.github.io\_includes\themes\twitter\default.html -->
  <link href="{{ ASSET_PATH }}/css/toc.css" rel="stylesheet" type="text/css">
  <script src="{{ ASSET_PATH }}/js/jquery-1.10.2.min.js"></script>
  <script src="{{ ASSET_PATH }}/js/jquery.toc.js"></script>

  <!-- 可以将这段放到post.html中，我现在是直接放default.html中 -->
  <script type="text/javascript">
  $(function(){
    $('.content').toc({
      anchorPrefix:'tocAnchor-',
      showAlways:false,
      saveShowStatus:true,
      contentsText:'目录',
      hideText:'隐藏',
      showText:'显示'
    });
    });
  </script>
```

4. 让toc跟随页面浮动
有个简单的方法，将position设置fixed，可以固定在页面不动。
jquery有一个扩展jquery.scroll-follow.js，可以实现这个功能，不过我这没试成功，所以用的下面这个方法

修改css样式

```css
/*anaer.github.io\assets\themes\twitter\css\toc.css*/
#toc-container {
  position:absolute;
  right: 120px;
}
```

添加js脚本

```js
<!-- anaer.github.io\_includes\themes\twitter\default.html -->
<script type="text/javascript">
var timer;
$(function(){
    $(window).scroll(function(){
        clearInterval(timer);
        var topScroll=getScroll();
        var topDiv="50px";  /*设置顶部位置*/
        var top=topScroll+parseInt(topDiv);
        timer=setInterval(function(){
            $("#toc-container").animate({"top":top},500); /* 修改为要浮动的元素 */
        },500)
    })
})
function getScroll(){
         var bodyTop = 0;
         if (typeof window.pageYOffset != 'undefined') {
                 bodyTop = window.pageYOffset;
         } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
                 bodyTop = document.documentElement.scrollTop;
         }
         else if (typeof document.body != 'undefined') {
                 bodyTop = document.body.scrollTop;
         }
         return bodyTop
}
</script>
```

### 分页设置

* 修改index.md为index.html
* 修改_config.yml文件，增加

```yml
# 每一页显示的文章数
paginate: 5
```

* 之后就可以在index.html页面中，引用paginator这个对象了

### 为jekyll静态博客添加静态搜索

* 添加anaer.github.io\search.xml

```xml

---
layout: nil
title : Search
---
<?xml version="1.0" encoding="utf-8"?>
<articles>
 {-% for post in site.posts %-}
 <article>
   <title>{-{ post.title }-}</title>
   <url>{-{ site.production_url }-}{-{ post.url }-}</url>
   <date>{-{ post.date | date_to_utc | date:'%Y-%m-%d' }-}</date>
 </article>
 {-% endfor %-}
</articles>

```

* 修改

```js
<!-- anaer.github.io\_includes\themes\twitter\welcome.html -->
<script>
$(function() {
    $.ajax({
        url: "search.xml",
        dataType: "xml",
        success: function( xmlResponse ) {
            var data = $( "article", xmlResponse ).map(function() {
                return {
                    value: $( "title", this ).text() + ", " +
                        ( $.trim( $( "date", this ).text() ) ),
                    desc: $("description", this).text(),
                    url: $("url", this).text()
                };
            }).get();

            $( "#J_search" ).autocomplete({
                source: data,
                minLength: 0,
                select: function( event, ui ) {
                    window.location.href = ui.item.url;
                }
            });
        }
    });
});

</script>

<div class="span4">
  <input id="J_search" placeholder="Simple Search"/>
</div>

```

### 图片和文件
站点需要的图片直接存放在assets/images文件夹中，
可以在_config.yml中定义一个形如img_url: http://anaer.github.io/assets/images的变量，
然后在markdown文件需要用到图片的地方插入类似
`![git代码库结构]({{ site.img_url }}/2014-09-07-picture.png)`的代码即可显示图像。

### jekyll常配置文件
首页: anaer.github.io/_includes/themes/twitter/welcome.html
自定义样式: anaer.github.io/assets/themes/twitter/css/custom.css
帖子路径: anaer.github.io/_posts

### 参考

#### 建站指南
* [基于jekyll的github建站指南](http://jiyeqian.github.io/2012/07/host-your-pages-at-github-using-jekyll/)
* [在Cygwin下配置 jekyll bootstrap ](http://xialuxing.com/2012/05/11/cygwin-jekyll-bootstrap/)
* [Markdown 语法说明 ](http://wowubuntu.com/markdown/)
* [Jekyll QuickStart](http://jekyllbootstrap.com/usage/jekyll-quick-start.html)
* [Jekyll官方文档](http://jekyllrb.com/docs/home/)
* [Jekyll模板语言](http://jekyllrb.com/docs/templates/)
* [Jekyll+多说，建立属于你的轻博客](http://www.ituring.com.cn/article/114888)
* [利用Jekyll搭建个人博客](http://tankle.github.io/2013/05/07/jekyll-introduction.html)
* [TOC Generator for Markdown](https://github.com/dafi/tocmd-generator)
* [jq - div跟随页面滚动条滚动](http://www.cnblogs.com/wwcherish/archive/2013/03/18/2965871.html)
* [Jekyll变量 和 Jekyll模板语法教程](http://higrid.net/c-art-jeklly_template_data.htm)
* [为Jekyll增加不完美的分页和文章摘要](http://kingauthur.info/2013/01/20/the-paginator-and-excerpt-in-jekyll/)
* [Jekyll 扩展的 Liquid 设计 ](http://havee.me/internet/2013-11/jekyll-liquid-designers.html)
* [Jekyll在github上构建免费的Web应用](http://blog.fens.me/jekyll-bootstarp-github/)
* [Sitemaps XML format ](http://www.sitemaps.org/protocol.html)
* [为 jekyll 静态博客添加静态搜索——无数据库实现站内静态网页搜索](http://higrid.net/c-art-static_search_engine.htm)
* [gem 安装 jekyll](https://rubygems.org/gems/jekyll)
* [利用Jekyll在GitHub Pages上部署博客 ](http://blog.csdn.net/zhangao0086/article/details/37922607)

#### 语法高亮
* [Jekyll 语法高亮的格式](http://jekyllrb.com/docs/posts/#highlighting_code_snippets)
* [用Jekyll和Pygments配置代码高亮](https://zyzhang.github.io/blog/2012/08/31/highlight-with-Jekyll-and-Pygments/)
* [Jekyll中使用google-code-prettify高亮代码](http://blog.evercoding.net/2013/02/27/highlight-code-with-google-code-prettify/)
