---
layout: post
title: "代码片断"
description: ""
category: Java
tags: [Java]
---

{% highlight java linenos %}
	    Method m = invocation.getMethod();
	    Service meta = m.getAnnotation(Service.class);
	    if (meta != null) {
	    		System.out.println("功能号:" + meta.functionId());
	    }

	    //获取被调用方法所属的对象
	    Object target = invocation.getThis();
	    //获取被调用方法的参数
	    Object[] args = invocation.getArguments();
	    
	    System.out.println("所执行的方法: " + m.getName());
	    System.out.println("对象的类型: " + target.getClass().getName());
	    
	    System.out.println("方法的参数:");
	    for (Object arg : args) {
	    System.out.print("    > " + arg);
	    }
	    System.out.print("\n");
	    
	    //	Object[] args = invocation.getArguments();
	    if (args == null || args.length == 0) { // 如果输出参数为null，则放过去
	    return procService(invocation);
	    }
	    Object request = args[0];
	    System.out.println("111111111111111111111111111111111111111111111111" + request);
{% endhighlight %}