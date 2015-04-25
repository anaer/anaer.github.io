---
layout: post
title: "SpringMvc实现Restful"
description: "SpringMvc实现Restful"
category:Spring
tags: [Spring,Restful]
---

#### Restful

    /blog/1 GET     得到id=1的blog
    /blog/1 DELETE  删除id=1的blog
    /blog/1 PUT     更新id=1的blog
    /blog   POST    新增blog

    SpringMvc的Restful是通过@RequestMapping及@PathVariable annotation提供的

### 参考
  * [Spring MVC过滤器-HiddenHttpMethodFilter](http://blog.csdn.net/geloin/article/details/7444321)
  * [SpringMVC实现RESTful风格](http://lydia-fly.iteye.com/blog/2164573)
