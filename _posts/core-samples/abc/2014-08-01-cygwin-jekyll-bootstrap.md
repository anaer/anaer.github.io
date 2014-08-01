---
layout: post
title: "在Cygwin下配置 jekyll bootstrap"
description: ""
category: 
tags: []
---
{% include JB/setup %}

### Step by step 教你安装jekyll
---
### 解决依赖 
* 安装 [Cygwin](/2012/05/12/auto-install-cygwin/)
* 安装ruby的依赖yaml
        $ wget http://pyyaml.org/download/libyaml/yaml-0.1.4.tar.gz
        $ tar xf yaml-0.1.4.tar.gz
        $ cd yaml-0.1.4
        $ ./configure --prefix=/usr/local/yaml && make -j2 
        $ make install
* 安装Ruby 1.9.2
        $ wget http://ruby.taobao.org/mirrors/ruby/ruby-1.9.2-p320.tar.bz2
        $ tar xf ruby-1.9.2-p320.tar.bz2
        $ cd ruby-1.9.2-p320
        $ ./configure --prefix=/usr/local/ruby19 --with-opt-dir=/usr/local/yaml/ && make -j2 
        $ make install
* 配置PATH
        $ echo 'PATH=/usr/local/ruby19/bin:$PATH' >>~/.bashrc
        $ source ~/.bashrc
* 安装gem
        $ wget http://production.cf.rubygems.org/rubygems/rubygems-1.8.24.tgz
        $ tar xf rubygems-1.8.24.tgz
        $ cd rubygems-1.8.24
        $ ruby setup.rb
* 安装posix-spawn(GEM自带的0.3.6版本对Cygwin支持有点问题详见[#20](http://github.com/rtomayko/posix-spawn/pull/20)
        $ git clone git://github.com/rtomayko/posix-spawn.git
        $ cd posix-spawn
        $ gem build posix-spawn.gemspec
        $ gem install posix-spawn-0.3.6.gem
* 安装jekyll以及一些而外依赖
        $ gem instal -V jekyll RedCloth rdiscount
* 修复jekyll 启动错误
如遇到 ``invalid byte sequence in GBK (ArgumentError)`` 执行 
        $ echo -e 'export LC_ALL="en_US.UTF-8"\nexport LANG="en_US.UTF-8"' >>~/.bashrc
还不行就参考参考[这个](http://www.oschina.net/question/129471_37163)

---
### 配置blog

* 克隆[jekyll-bootstrap](https://github.com/plusjade/jekyll-bootstrap)并开启测试
        $ git clone git://github.com/plusjade/jekyll-bootstrap.git ~/djluo.github.com
        $ cd ~/djluo.github.com
        $ jekyll --server
可以用游览器访问了 http://127.0.0.1:4000/
* 修改配置文件``_config.yml`` 大致如下:
        title : XiaLuXing
        tagline: Go...
        author :
            name : djluo
            email : dj.luo@xialuxing.com
            github : djluo
        production_url : http://xialuxing.com
* 使用自己的域名, github默认提供的是二级域名(djluo.github.com)
        $ cd ~/djluo.github.com
        $ echo "xialuxing.com" > CNAME
* 注册 [disqus](http://disqus.com/) 帐号,然后再修改``_config.yml``:
          comments :
            provider : disqus
            disqus :
              short_name : xialuxing
* 到 [github](https://github.com/)上注册一个帐号 [djluo](https://github.com/djluo),
然后到``Account Settings`` => ``SSH key`` 部署上自己的ssh公钥.
再新建一个不带初始化的 ``djluo.github.com`` Git仓库.
* 配置本地Git并提交至github
        $ cd ~/djluo.github.com
        $ git config user.name djluo
        $ git config user.email dj.luo@xialuxing.com
        $ git remote set-url origin git@github.com:djluo/djluo.github.com.git
        $ git add .
        $ git commit -m "init blog"
        $ git push
* 配置DNS解析:
    1. 将xialuxing.com的A记录指向djluo.github.com的IP(必选)
    2. 将www.xialuxing.com CNAME指向djluo.github.com(可选)
---
### 最后
没问题的话,等个10分钟左右,应该会收到github关于``Page build successful``的邮件了。开游览器去访问吧
### 参考过的文章
    1. http://www.worldhello.net/2011/11/29/jekyll-based-blog-setup.html
    2. http://yishanhe.net/
    3. http://www.oschina.net/question/129471_37163
    4. http://wowubuntu.com/markdown/
    5. http://wiki.github.com/mojombo/jekyll/liquid-extensions


<!--
 vim: expandtab tabstop=4 shiftwidth=4 softtabstop=4
-->

