---
layout: page
title : "代码"
header : "代码片段"
group: 
---

```java
 /**
     * 日期相加
     *
     * @param date
     *            日期
     * @param day
     *            天数
     * @return 返回相加后的日期
     */
    public static Date addDate(Date date, int day) {
	Calendar c = Calendar.getInstance();
	c.setTimeInMillis(getMillis(date) + (long) day * 24 * 3600 * 1000);
	return c.getTime();
    }

    /**
     * 返回毫秒
     *
     * @param date
     *            日期
     * @return 返回毫秒
     */
    public static long getMillis(Date date) {
	Calendar c = Calendar.getInstance();
	c.setTime(date);
	return c.getTimeInMillis();
    }
```

```java
String s="125.671";
BigDecimal b = new BigDecimal(s); 
b=b.setScale(2, BigDecimal.ROUND_DOWN); //小数位 直接舍去
//b=b.setScale(2, BigDecimal.ROUND_HALF_UP); //四舍五入

//BigDecimal add(BigDecimal augend) 
//BigDecimal subtract(BigDecimal subtrahend)
//BigDecimal multiply(BigDecimal multiplicand) 
//BigDecimal divide(BigDecimal divisor)

BigDecimal c = b.add(nwe BigDecimat("763.21"));
```

```java
 /**
     * 获取两个日期的间隔天数
     * @param beginStr
     * @param endStr
     * @return
     */
    public int countDays(String beginStr, String endStr) {
	return DateUtil.countDays(beginStr, endStr, "yyyyMMdd");
    }

    /**
     * 8位数字转日期
     * @param iDate
     * @return
     */
    public Date IntegerToDate(Integer iDate) {
	return StrToDate(iDate.toString());
    }

    /**
     * 8位字符串转日期
     * @param datestr
     * @return
     */
    public Date StrToDate(String datestr) {
	Date result = null;
	try {
	    result = DateUtil.convertStringToDate("yyyyMMdd", datestr);
	} catch (ParseException e) {
	    e.printStackTrace();
	}
	return result;
    }
```

```
利息金额算至分位，分以下尾数四舍五入
```

``` java
	public class HelloWorld {
		public static void main(String args[]) {
		  System.out.println("Hello World!");
		}
	}
```

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
	System.out.println( request);
```

``` java
	//implements MethodInterceptor, InitializingBean
	//public Object invoke(MethodInvocation invocation)
	Object[] args = invocation.getArguments();
	if (args == null || args.length == 0) { // 如果输出参数为null，则放过去
	    return procService(invocation);
	}
```
