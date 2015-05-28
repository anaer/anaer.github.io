---
layout: post
title:  "jekyll 介绍"
description : "简单介绍如何使用github+jekyll来写自己的博客"
category: github
tags: [github, jekyll]
---

## Jekyll 是什么？
Jekyll是一个简单的、blog框架和静态网页生成器。本质上讲Jekyll是一个文本转换引擎。

## Jekyll 框架结构
    .
    ├── _config.yml
    ├── _includes
    |  ├── footer.html
    |  └── header.html
    ├── _layouts
    |  ├── default.html
    |  └── post.html
    ├── _posts
    |  ├── 2015-05-28-jekyll.md
    ├── _data
    |  └── members.yml
    ├── _site
    └── index.html

* _config.yml
保存配置数据。

* _drafts
drafts 是未发布的文章。这些文件的格式中都没有 title.MARKUP 数据。

* _includes
可以加载这些包含部分到布局或者文章中以方便重用。可以用这个标签来把文件 _includes/file.ext 包含进来。

* _layouts
layouts 是包裹在文章外部的模板。布局可以在 YAML 头信息中根据不同文章进行选择。 标签可以将content插入页面中。

* _posts
这里放的就是你的文章了。文件格式很重要，必须要符合: YEAR-MONTH-DAY-title.MARKUP。 The permalinks 可以在文章中自己定制，但是数据和标记语言都是根据文件名来确定的。

* _site
一旦 Jekyll 完成转换，就会将生成的页面放在这里（默认）。最好将这个目录放进你的 .gitignore 文件中。

* index.html and other HTML, Markdown, Textile files
如果这些文件中包含 YAML 头信息 部分，Jekyll 就会自动将它们进行转换。当然，其他的如 .html， .markdown，  .md，或者 .textile 等在你的站点根目录下或者不是以上提到的目录中的文件也会被转换。

* Other Files/Folders
其他一些未被提及的目录和文件如  css 还有 images 文件夹， favicon.ico 等文件都将被完全拷贝到生成的 site 中。

## 头信息
YAML头信息的格式在三虚线之间, 可以是预定义的变量或自己创建的变量

    ---
    layout: post
    title: Blogging
    ---

#### 预定义的全局变量
* layout
指定 _layouts 目录下的模板文件

* permalink
如需让博客URL异于默认值 /year/month/day/title.html 设置这个变量。

* published
不需展示一个博文，可设置这个变量为 false。

* category & categories
文章类别。文章多个类别可以通过 YAML list来指定，或者用空格隔开。

* tags
类似分类，文章可增加一个或多个标签。不同标签可通过 YAML 列表或空格隔开

#### 自定义变量
自定义变量都会在数据转换中通过 Liquid 模板被调用。

#### 文章中变量
* date
这里的日期会覆盖文章名字中的日期。

## 博客文章

#### 文章名
    年-月-日-标题.md
    2015-05-28-how-to-write-a-blog.md

#### 内容格式
YAML头信息 + Markdown

#### 引用图片和其他资源
    ![有帮助的截图](/assets/screenshot.jpg)

## 常用变量

#### 全局变量
* site
来自_config.yml文件，全站范围的信息 +配置。

* page
页面专属的信息 + YAML 头文件信息。通过 YAML 头文件自定义的信息都可以在这里被获取。

* content
被 layout 包裹的那些 Post 或者 Page 渲染生成的内容。但是又没定义在 Post 或者 Page 文件中的变量。

* paginator
每当 paginate 配置选项被设置了的时候，这个变量就可用了

#### 全站变量
* site.time
当前时间

* site.pages
所有 Pages 的清单

* site.posts
一个按照时间倒序的所有 Posts 的清单

* site.related_posts
如果当前被处理的页面是一个 Post，这个变量就会包含最多10个相关的 Post

* site.categories.CATEGORY
所有的在 CATEGORY 类别下的帖子

* site.tags.TAG
所有的在 TAG 标签下的帖子

* site.[CONFIGURATION_DATA]
所有的通过命令行和 _config.yml 设置的变量都会存到这个 site 里面。

#### 页面变量
* page.content
页面内容的源码

* page.title
页面的标题

* page.excerpt
页面摘要的源码

* page.url
帖子以斜线打头的相对路径。

* page.date
帖子的日期。

* page.id
帖子的唯一标识码

* page.categories
这个帖子所属的 Categories

* page.tags
这个 Post 所属的所有 tags

* page.path
Post 或者 Page 的源文件地址

#### 分页器
* paginator.per_page
每一页Posts的数量。

* paginator.posts
这一页可用的Posts。

* paginator.total_posts
Posts 的总数。

* paginator.total_pages
Pages 的总数。

* paginator.page
当前页号。

* paginator.previous_page
前一页的页号。

* paginator.previous_page_path
前一页的地址。

* paginator.next_page
下一页的页号。

* paginator.next_page_path
下一页的地址。
