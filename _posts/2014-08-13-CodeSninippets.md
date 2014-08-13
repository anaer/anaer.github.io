---
layout: post
title: "代码片断"
description: ""
category: Java
tags: [Java]
---

{% highlight xml %}
mvn install:install-file -DgroupId=com.autonavi -DartifactId=libamapv3 -Dversion=v3 -Dfile=/Users/keepcleargas/Downloads/AMapSDKV2Demo/libs/armeabi/libamapv3.so -Dpackaging=so -DgeneratePom=true -Dclassifier=armeabi

mvn install:install-file -DgroupId=com.autonavi -DartifactId=location -Dversion=2.0.0 -Dfile=/Users/keepcleargas/Downloads/AMapSDKV2Demo/libs/MapApiLocation.jar -Dpackaging=jar -DgeneratePom=true
{% endhighlight %}

``` java
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
```