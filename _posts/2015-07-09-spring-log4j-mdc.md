---
layout: post
title: "log4j 输出附加信息"
description: "log4j输出附加信息"
category:log4j
tags: [log4j]

---

#### MDC和NDC
NDC（Nested Diagnostic Context）和MDC（Mapped Diagnostic Context）是log4j种非常有用的两个类，它们用于存储应用程序的上下文信息（context infomation），从而便于在log中使用这些上下文信息。

NDC采用了一个类似栈的机制来push和pop上下文信息，每一个线程都独立地储存上下文信息。比如说一个servlet就可以针对每一个request创建对应的NDC，储存客户端地址等等信息。
当使用的时候，我们要尽可能确保在进入一个context的时候，把相关的信息使用NDC.push(message);在离开这个context的时候使用NDC.pop()将信息删除。另外由于设计上的一些问题，还需要保证在当前thread结束的时候使用NDC.remove()清除内存，否则会产生内存泄漏的问题。
存储了上下文信息之后，我们就可以在log的时候将信息输出。在相应的PatternLayout中使用”%x”来输出存储的上下文信息，下面是一个PatternLayout的例子：
%r [%t] %-5p %c{2} %x - %m%n
使用NDC最重要的好处就是，当我们想输出一些上下文的信息的时候，不需要让logger去寻找这些信息，而只需要在适当的位置进行存储，然后再配置文件中修改PatternLayout。在最新的log4j 1.3版本中增加了一个org.apache.log4j.filters.NDCMatchFilter，用来
根据NDC中存储的信息接受或拒绝一条log信息。

MDC和NDC非常相似，所不同的是MDC内部使用了类似map的机制来存储信息，上下文信息也是每个线程独立地储存，所不同的是信息都是以它们的key值存储在”map”中。相对应的方法，MDC.put(key, value); MDC.remove(key); MDC.get(key); 在配置PatternLayout的时候使用：%x{key}来输出对应的value。同样地，MDC也有一个org.apache.log4j.filters.MDCMatchFilter。这里需要注意的一点，MDC是线程独立的，但是一个子线程会自动获得一个父线程MDC的copy。
至于选择NDC还是MDC要看需要存储的上下文信息是堆栈式的还是key/value形式的。 

### MDC使用
#### 添加Filter
```java
package com.common.aop;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.MDC;

public class SessionFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        try {
            HttpServletRequest httpReq = (HttpServletRequest) request;
            MDC.put("sessionId", httpReq.getRequestedSessionId());
            chain.doFilter(request, response);
        } finally {
            //需要在finally中将记录的数据清除掉.
            MDC.clear();
        }
    }

    @Override
    public void destroy() {
    }

}

```

#### web.xml中添加filter配置
```xml
<filter>
    <filter-name>sessionFilter</filter-name>
    <filter-class>com.common.aop.SessionFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>sessionFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

#### log4j配置文件中添加配置
其中%X{sessionId}对应Filter里写入的sessionId

```
log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS} %5p %t %X{sessionId} %c{2}:%L - %m%n  
```
