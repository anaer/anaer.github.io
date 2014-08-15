---
layout: post
title: "在Cygwin下配置 jekyll bootstrap"
description: "本站部署教程"
category: Cygwin
tags: [Cygwin, jekyll bootstrap]
---
{% include JB/setup %}

### Step by step 教你安装jekyll
---
### 解决依赖
* 安装Cygwin, 并且下载apt-cyg工具
* 安装Ruby
        执行apt-cyg install Ruby安装Ruby，并且会自动添加到PATH目录下
* 安装[gem](http://rubygems.org/pages/download)

``` sh
        $ wget http://production.cf.rubygems.org/rubygems/rubygems-1.8.24.tgz
        $ tar xf rubygems-1.8.24.tgz
        $ cd rubygems-1.8.24
        $ ruby setup.rb
```

* 安装jekyll以及一些而外依赖
```sh
        $ gem instal -V jekyll RedCloth rdiscount
```
* 修复jekyll 启动错误

        出现错误``invalid byte sequence in UTF-8 (ArgumentError)``
        本机测试的情况是只要保证文件格式为Unix UTF-8即可

---
### 配置blog

* 克隆[jekyll-bootstrap](https://github.com/plusjade/jekyll-bootstrap)并开启测试  

``` sh
        $ git clone git://github.com/plusjade/jekyll-bootstrap.git ~/anaer.github.com
        $ cd anaer.github.com
        $ jekyll server
```
        访问 http://127.0.0.1:4000/
* 修改配置文件``_config.yml`` 大致如下:  

``` yml
        title : My Blog :)
        tagline: Go...
        author :
            name : anaer
            email : anaer@email.test
            github : anaer
        production_url : http://anaer.github.io
```
* 使用自己的域名, github默认提供的是二级域名(anaer.github.com)

        $ cd anaer.github.com
        $ echo "hostname.com" > CNAME
* 注册 [disqus](http://disqus.com/) 帐号,然后再修改``_config.yml``:  

``` yml
          comments :
            provider : disqus
            disqus :
              short_name : anaer
```
### 语法高亮配置

* 修改_config.yml, 应用语法高亮功能
	设置highlighter: pygments

* 选择一种样式，应用在Jekyll中  

``` sh
    cd anaer.github.io/assets/themes/twitter/css
    pygmentize -S native -f html > pygments.css, “native”是样式名，“html”是formatter
```
    在layout中引用刚刚加的pygments.css
    anaer.github.io/_includes/themes/twitter/default.html添加:
	<link href="{{ ASSET_PATH }}/css/pygments.css" rel="stylesheet" type="text/css" media="all">

* 用法

  ``` java
  {% highlight java linenos %}
  public class HelloWorld {
      public static void main(String args[]) {
        System.out.println("Hello World!");
      }
  }
  {% endhighlight %}
  ```

---
### 参考过的文章

    0. http://xialuxing.com/2012/05/11/cygwin-jekyll-bootstrap/
    1. http://www.worldhello.net/2011/11/29/jekyll-based-blog-setup.html
    2. http://yishanhe.net/
    3. http://www.oschina.net/question/129471_37163
    4. http://wowubuntu.com/markdown/
    5. http://wiki.github.com/mojombo/jekyll/liquid-extensions
    6. https://zyzhang.github.io/blog/2012/08/31/highlight-with-Jekyll-and-Pygments/
