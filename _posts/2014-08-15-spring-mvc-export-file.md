---
layout: post
title: "SpringMVC 导出Excel及Pdf"
description: "转载"
category: Java
tags: [Java]
---

HTML页面并不总是向用户显示数据输出的最好方式，
Spring支持从数据动态生成PDF或Excel文件，并使这一过程变得简单。
文档本身就是视图，从服务器以流的方式加上内容类型返回文档，
客户端PC只要运行电子表格软件或PDF浏览软件就可以浏览。
下面是一个简单实现的例子：
界面两个button，一个实现excel ,一个pdf.
为了使用Excel电子表格，你需要在你的classpath中加入‘poi’库文件，
而对PDF文件，则需要iText.jar文件。

它们都包含在Spring的主发布包中。
另外经过测试还需要加入包spring-beans.jar，spring-context.jar，spring-web.jar，spring-webmvc.jar。


1. /WEB-INF/web.xml配置文件，主要配置相应的servlet即可
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="http://java.sun.com/xml/ns/javaee"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
	id="WebApp_ID" version="2.5">
	<display-name>SpringMVC_ExportFile_Demo</display-name>

	<!-- Spring MVC 的Servlet，它将加载WEB-INF/spring-servlet.xml 以启动Spring MVC模块 -->
	<servlet>
		<servlet-name>springmvc</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<load-on-startup>1</load-on-startup>
	</servlet>
	<servlet-mapping>
		<servlet-name>springmvc</servlet-name>
		<url-pattern>*.form</url-pattern>
	</servlet-mapping>

	<welcome-file-list>
		<welcome-file>index.html</welcome-file>
		<welcome-file>index.htm</welcome-file>
		<welcome-file>index.jsp</welcome-file>
		<welcome-file>default.html</welcome-file>
		<welcome-file>default.htm</welcome-file>
		<welcome-file>default.jsp</welcome-file>
	</welcome-file-list>
</web-app>
```

2. /WEB-INF/springmvc-servlet.xml  控制文件及spring-servlet.xml配置,增加ViewController的配置
``` xml
<?xml version="1.0" encoding="GB2312"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context-3.0.xsd">

<context:component-scan base-package="com.lzk.controller"/>

    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

</beans>
```

3. ViewController的代码
```java
package com.lzk.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.lzk.common.ViewExcel;
import com.lzk.common.ViewPDF;

/**
 * 生成excel或PDF类型试图
 * 根据参数进行数据组装，并跳转到相应的视图页面
 * View Controller Bean<br>
 *
 * @author Tony Lin Created on 2008-10-22
 * @version Version 1.0
 */

@Controller
@RequestMapping("/view.form")
public class ViewController {

    @RequestMapping(params = "method=view", method = RequestMethod.GET)
    public String view(HttpServletRequest request, HttpServletResponse response) {
	return "/view";
    }

    @RequestMapping(params = "method=exceltest", method = RequestMethod.GET)
    public ModelAndView viewExcel(HttpServletRequest request, HttpServletResponse response) {
	List list = new ArrayList();
	Map model = new HashMap();
	list.add("test1");
	list.add("test2");
	model.put("list", list);
	ViewExcel viewExcel = new ViewExcel();
	return new ModelAndView(viewExcel, model);
    }

    @RequestMapping(params = "method=pdftest", method = RequestMethod.GET)
    public ModelAndView viewPDF(HttpServletRequest request, HttpServletResponse response) throws Exception {
	List list = new ArrayList();
	Map model = new HashMap();
	list.add("test1");
	list.add("test2");
	model.put("list", list);
	ViewPDF viewPDF = new ViewPDF();
	return new ModelAndView(viewPDF, model);
    }
}
```

4. 用于Excel视图的视图子类
``` java
package com.lzk.common;

import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

/**
 * 生成excel视图，可用excel工具打开或者保存
 * 由ViewController的return new ModelAndView(viewExcel, model)生成
 * @author Tony Lin Created on 2008-10-22
 * @version Version 1.0
 */
public class ViewExcel extends AbstractExcelView {

    @Override
    public void buildExcelDocument(Map model, HSSFWorkbook workbook, HttpServletRequest request, HttpServletResponse response) throws Exception {

	HSSFSheet sheet = workbook.createSheet("list");
	sheet.setDefaultColumnWidth((short) 12);

	HSSFCell cell = getCell(sheet, 0, 0);
	setText(cell, "Spring Excel test");

	HSSFCellStyle dateStyle = workbook.createCellStyle();
	//dateStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("mm/dd/yyyy"));
	cell = getCell(sheet, 1, 0);
	cell.setCellValue("日期：2008-10-23");
	//cell.setCellStyle(dateStyle);
	getCell(sheet, 2, 0).setCellValue("测试1");
	getCell(sheet, 2, 1).setCellValue("测试2");

	HSSFRow sheetRow = sheet.createRow(3);
	for (short i = 0; i < 10; i++) {
	    sheetRow.createCell(i).setCellValue(i * 10);
	}

	// 默认名称为view.form
	String filename = "测试.xls";//设置下载时客户端Excel的名称
	filename = encodeFilename(filename, request);//处理中文文件名
	response.setContentType("application/vnd.ms-excel");
	response.setHeader("Content-disposition", "attachment;filename=" + filename);
	OutputStream ouputStream = response.getOutputStream();
	workbook.write(ouputStream);
	ouputStream.flush();
	ouputStream.close();

    }

    /**
     * 设置下载文件中文件的名称
     *
     * @param filename
     * @param request
     * @return
     */
    public static String encodeFilename(String filename, HttpServletRequest request) {
	/**
	 * 获取客户端浏览器和操作系统信息
	 * 在IE浏览器中得到的是：User-Agent=Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; Maxthon; Alexa Toolbar)
	 * 在Firefox中得到的是：User-Agent=Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.7.10) Gecko/20050717 Firefox/1.0.6
	 */
	String agent = request.getHeader("USER-AGENT");
	try {
	    if (agent != null && -1 != agent.indexOf("MSIE")) {
		String newFileName = URLEncoder.encode(filename, "UTF-8");
		newFileName = StringUtils.replace(newFileName, "+", "%20");
		if (newFileName.length() > 150) {
		    newFileName = new String(filename.getBytes("GB2312"), "ISO8859-1");
		    newFileName = StringUtils.replace(newFileName, " ", "%20");
		}
		return newFileName;
	    }
	    if (agent != null && -1 != agent.indexOf("Mozilla")) {
		return MimeUtility.encodeText(filename, "UTF-8", "B");
	    }

	    return filename;
	} catch (Exception ex) {
	    return filename;
	}
    }

}
```

5. 用于PDF视图的视图子类
```java
package com.lzk.common;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.view.document.AbstractPdfView;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
/**
* 生成PDF视图，可用PDF浏览器打开或者保存
* 由ViewController的return new ModelAndView(viewPDF, model)生成
* @author Tony Lin Created on 2008-10-22
* @version Version 1.0
*/
public class ViewPDF extends AbstractPdfView {
    public void buildPdfDocument(Map model, Document document,
            PdfWriter writer, HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        List list = (List) model.get("list");

        for (int i = 0; i < list.size(); i++)
            document.add(new Paragraph((String) list.get(i)));
    }
}
```

6. /WEB-INF/jsp/view.jsp JSP页面调用
```html
<%@ page language="java" pageEncoding="UTF-8"%>
<a href="<%=request.getContextPath()%>/view.form?method=pdftest" target="blank">保存pdf</a>
<input name="button" type="button" id="button" value="保存excel"
onclick="javascript:window.open('<%=request.getContextPath()%>/view.form?method=exceltest');"/>
```


7. maven 依赖配置
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>SpringMVC_ExportFile_Demo</groupId>
	<artifactId>SpringMVC_ExportFile_Demo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>war</packaging>

	<repositories>
		<repository>
			<id>oschina</id>
			<url>http://maven.oschina.net/content/groups/public/</url>
		</repository>
	</repositories>

	<dependencies>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>3.0.5.RELEASE</version>
		</dependency>

		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>servlet-api</artifactId>
			<version>2.5</version>
			<scope>provided</scope>
		</dependency>

		<!-- 处理pdf -->
		<dependency>
			<groupId>com.lowagie</groupId>
			<artifactId>itext</artifactId>
			<version>4.2.1</version>
		</dependency>

		<!-- 处理excel -->
		<dependency>
			<groupId>org.apache.poi</groupId>
			<artifactId>poi</artifactId>
			<version>3.10-FINAL</version>
		</dependency>

		<!-- 支持中文名 需要依赖这个jar包 -->
		<dependency>
			<groupId>com.sun.mail</groupId>
			<artifactId>javax.mail</artifactId>
			<version>1.5.0</version>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>3.1</version>
				<configuration>
					<source>1.6</source>
					<target>1.6</target>
				</configuration>
			</plugin>
			<plugin>
				<artifactId>maven-war-plugin</artifactId>
				<version>2.4</version>
				<configuration>
					<failOnMissingWebXml>false</failOnMissingWebXml>
				</configuration>
			</plugin>
		</plugins>
	</build>
</project>
```

8. 测试地址
  http://127.0.0.1:8080/{web应用名}/view.form?method=view
  http://127.0.0.1:8080/{web应用名}/view.form?method=pdftest
  http://127.0.0.1:8080/{web应用名}/view.form?method=exceltest

### Demo代码
	https://github.com/anaer/SpringMVC_ExportFile_Demo

### 参考
  1. [用spring MVC 生成Excel和PDF ](http://blog.csdn.net/linlzk/article/details/3389925)
  2. [Spring mvc 下导出Excel文件](http://tankywang.iteye.com/blog/1517333)
