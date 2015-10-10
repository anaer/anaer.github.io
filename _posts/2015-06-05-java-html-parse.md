---
layout: post
title: "Java中解析html"
description: ""
category: Java
tags: [Java, html]
---

#### 解析方法
* htmlParser

#### htmlPraser
    核心类:org.htmlparser.Parser

    构造函数：
    public Parser ();
    public Parser (Lexer lexer, ParserFeedback fb);
    public Parser (URLConnection connection, ParserFeedback fb) throws ParserException;
    public Parser (String resource, ParserFeedback feedback) throws ParserException;
    public Parser (String resource) throws ParserException;
    public Parser (Lexer lexer);
    public Parser (URLConnection connection) throws ParserException;
    静态类:
    public static Parser createParser (String html, String charset);



### 参考
* [Java解析HTML之HTMLParser使用与详解](http://free0007.iteye.com/blog/1131163)
* [HTML解析器软件](http://renegade24.iteye.com/blog/865197)
