---
layout: post
title: "Java Bean与Map<String,Object>互转"
description: ""
category: java
tags: [java]
---

1. 为什么要实现javaBean与Map<String,Object>相互转换？

用过spring的都知道spring的MVC框架中有一个BaseCommandController对象，利用这个对象我们就可以很方便的将从客户端传递过来的参数封装到一个JavaBean对象中去，而不需要我们request.getParameter("name");bean.setName(name);了，从而也简化了不少的工作。如果大家用过BeanUtils.populate的话，就知道，这个方法是可以很方便的将request提交的页面表单自动填写到你创建的对象中

2. 如何实现javaBean与Map<String,Object>相互转换？

方法1： 利用java.beans.Introspector和java.beans.PropertyDescriptor实现 javaBean与Map<String,Object>互转

方法2： 利用org.apache.commons.beanutils.BeanUtils工具类，BeanUtils.populate实现Map 转换为javaBean

  ```java
  package javaStudyDemo.bean.reflect.test;

  import java.beans.BeanInfo;
  import java.beans.Introspector;
  import java.beans.PropertyDescriptor;
  import java.lang.reflect.Method;
  import java.util.HashMap;
  import java.util.Map;
  import javaStudyDemo.others.PersonBean;

  import org.apache.commons.beanutils.BeanUtils;

  /**
   * 当把Person类作为BeanUtilTest的内部类时，程序出错<br>
   * java.lang.NoSuchMethodException: Property '**' has no setter method<br>
   * 本质：内部类 和 单独文件中的类的区别 <br>
   * BeanUtils.populate方法的限制：<br>
   * The class must be public, and provide a public constructor that accepts no arguments. <br>
   * This allows tools and applications to dynamically create new instances of your bean, <br>
   * without necessarily knowing what Java class name will be used ahead of time
   */
  public class BeanUtilTest {

	  public static void main(String[] args) {

		  PersonBean person = new PersonBean();
		  Map<String, Object> mp = new HashMap<String, Object>();
		  mp.put("name", "Mike");
		  mp.put("age", 25);
		  mp.put("mN", "male");

		  // 将map转换为bean
		  transMap2Bean2(mp, person);

		  System.out.println("--- transMap2Bean Map Info: ");
		  for (Map.Entry<String, Object> entry : mp.entrySet()) {
			  System.out.println(entry.getKey() + ": " + entry.getValue());
		  }

		  System.out.println("--- Bean Info: ");
		  System.out.println("name: " + person.getName());
		  System.out.println("age: " + person.getAge());
		  System.out.println("mN: " + person.getmN());

		  // 将javaBean 转换为map
		  Map<String, Object> map = transBean2Map(person);

		  System.out.println("--- transBean2Map Map Info: ");
		  for (Map.Entry<String, Object> entry : map.entrySet()) {
			  System.out.println(entry.getKey() + ": " + entry.getValue());
		  }

	  }

	  // Map --> Bean 2: 利用org.apache.commons.beanutils 工具类实现 Map --> Bean
	  public static void transMap2Bean2(Map<String, Object> map, Object obj) {
		  if (map == null || obj == null) {
			  return;
		  }
		  try {
			  BeanUtils.populate(obj, map);
		  } catch (Exception e) {
			  System.out.println("transMap2Bean2 Error " + e);
		  }
	  }

	  // Map --> Bean 1: 利用Introspector,PropertyDescriptor实现 Map --> Bean
	  public static void transMap2Bean(Map<String, Object> map, Object obj) {

		  try {
			  BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
			  PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();

			  for (PropertyDescriptor property : propertyDescriptors) {
				  String key = property.getName();

				  if (map.containsKey(key)) {
					  Object value = map.get(key);
					  // 得到property对应的setter方法
					  Method setter = property.getWriteMethod();
					  setter.invoke(obj, value);
				  }

			  }

		  } catch (Exception e) {
			  System.out.println("transMap2Bean Error " + e);
		  }

		  return;

	  }

	  // Bean --> Map 1: 利用Introspector和PropertyDescriptor 将Bean --> Map
	  public static Map<String, Object> transBean2Map(Object obj) {

		  if(obj == null){
			  return null;
		  }
		  Map<String, Object> map = new HashMap<String, Object>();
		  try {
			  BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
			  PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
			  for (PropertyDescriptor property : propertyDescriptors) {
				  String key = property.getName();

				  // 过滤class属性
				  if (!key.equals("class")) {
					  // 得到property对应的getter方法
					  Method getter = property.getReadMethod();
					  Object value = getter.invoke(obj);

					  map.put(key, value);
				  }

			  }
		  } catch (Exception e) {
			  System.out.println("transBean2Map Error " + e);
		  }

		  return map;

	  }
  }
  ```

  注: PersonBean不能 直接作为上面这个类的内部类，会转换失败

  ```java
  public class PersonBean {

	  private String  name;
	  private Integer age;
	  private String  mN;

	  /**
	   * @return the mN
	   */
	  public String getmN() {
		  return mN;
	  }

	  /**
	   * @param mN the mN to set
	   */
	  public void setmN(String mN) {
		  this.mN = mN;
	  }


	  /**
	   * @return the name
	   */
	  public String getName() {
		  return name;
	  }

	  /**
	   * @param name the name to set
	   */
	  public void setName(String name) {
		  this.name = name;
	  }

	  /**
	   * @return the age
	   */
	  public Integer getAge() {
		  return age;
	  }

	  /**
	   * @param age the age to set
	   */
	  public void setAge(Integer age) {
		  this.age = age;
	  }

  }
  ```

总结：  javaBean与Map<String,Object>互转利用到了java的内省（ Introspector ）和反射（reflect）机制。 其思路为： 通过类 Introspector 来获取某个对象的 BeanInfo 信息，然后通过 BeanInfo 来获取属性的描述器PropertyDescriptor，再利用属性描述器获取某个属性对应的 getter/setter 方法，然后通过反射机制来getter和setter。


什么是内省？

内省是 Java 语言对 Bean 类属性、事件的一种缺省处理方法。例如类 PersonBean中有属性 name, 那我们可以通过 getName,setName 来得到其值或者设置新的值。通过 getName/setName 来访问 name 属性，这就是默认的规则。 Java 中提供了一套 API 用来访问某个属性的 getter/setter 方法，通过这些 API 可以使你不需要了解这个规则（但你最好还是要搞清楚），这些 API 存放于包 java.beans 中。注意： PersonBean中属性mN的getter/setter方法必须满足javaBean命名规范，即getmN，不能写作getMN，否则转换失败。详情参考  http://blog.renren.com/share/236384819/5598710664

# 参考
  * [javaBean与Map<String,Object>互转 ](http://blog.csdn.net/cuidiwhere/article/details/8130434)
