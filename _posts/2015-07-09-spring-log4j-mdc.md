---
layout: post
title: "log4j 输出附加信息"
description: "log4j输出附加信息"
category:log4j
tags: [log4j]

---

#### MDC和NDC
在web应用中, 使用log4j做日志输出,如果需要输出如sessionID, 服务器ip等信息, 可以使用log4j的MDC或者NDC, 这两种的实现功能是一样的, 不过实现方法不同.
NDC使用的是HashMap
MDC使用的是ThreadLocal

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
