---
layout: welcome
title: anaer
---
{% include JB/setup %}


刚在 [侠路行](http://xialuxing.com/) 发现可以使用Github+Jekyll生成博客
试了下，还不错。

代码地址:https://github.com/anaer/anaer.github.io/

<hr>
####  最近的日志

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}/">{{ post.title }}</a></li>
  {% endfor %}
</ul>
