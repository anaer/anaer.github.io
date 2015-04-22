---
layout: post
title: "spring AOP取得session"
file: 
update: 22 Apr 2015
description: ""
category: Java
tags: [Java, Spring]
---

由于Spring 的AOP面向切面编程，与Servlet容器没有任何关联，所以想要获得Session会话比较麻烦。
当然Struts2同样不依赖Servlet容器，可以在Spring AOP中可以使用com.opensymphony.xwork2.ActionContext，就可以获得Session。
但是在Servlet中或struts1中，可以通过ThreadLocal方式将session保存，Spring AOP中获得Session对象。

``` java
//这个是保存request和session的类
public class SysContent {
	private static ThreadLocal<HttpServletRequest> requestLocal = new ThreadLocal<!-- <HttpServletRequest> -->();
	private static ThreadLocal<!-- <HttpServletResponse> --> responseLocal = new ThreadLocal<!-- <HttpServletResponse> -->();

	public static HttpServletRequest getRequest() {
		return (HttpServletRequest) requestLocal.get();
	}

	public static void setRequest(HttpServletRequest request) {
		requestLocal.set(request);
	}

	public static HttpServletResponse getResponse() {
		return (HttpServletResponse) responseLocal.get();
	}

	public static void setResponse(HttpServletResponse response) {
		responseLocal.set(response);
	}

	public static HttpSession getSession() {
		return (HttpSession) ((HttpServletRequest) requestLocal.get())
				.getSession();
	}
}

//这个是配置的过滤器
public class GetContent implements Filter {
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		SysContent.setRequest((HttpServletRequest) arg0);
		SysContent.setResponse((HttpServletResponse) arg1);
		arg2.doFilter(arg0, arg1);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
	}
}

//使用AOP进行环绕通知切入所有com.aptech.service包下的所有类的方法
@Aspect
public Class AopTest{
	@Around(value="execution(* com.aptech.service.*.*(..))")
	public void aroundTest(ProceedingJoinPoint pj) throws Exception {  
    	HttpServletRequest request = SysContent.getRequest();  
    	HttpServletResponse response = SysContent.getResponse();  
    	HttpSession session = SysContent.getSession();  
    	//其他操作
        if(true){
        	pj.proceed();
        }
        throw new Exception("您没有该权限");
    }
}

```

``` xml
	<!-- web.xml -->
	<filter>
		<filter-name>GetContent</filter-name>
		<filter-class>com.xxx.GetContent</filter-class>
	</filter>
	<filter-mapping>
		<filter-name>GetContent</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
```
