---
layout: post
title: "在java中使用dom4j解析xml文件"
description: "在java中使用dom4j解析xml文件"
category: java
tags: [java, xml, dom4j]
---

#### XML概念

    XML（可扩展标记语言）是一种很流行的简单的基于文本的语言来用作应用程序之间的通信模式。它被认为是传输标准装置和存储数据。JAVA提供了极好的支持和丰富的库来解析，修改或查询XML文档。


#### 添加dom4j jar包依赖

```xml
<!-- dom4j -->
<dependency>
  <groupId>dom4j</groupId>
  <artifactId>dom4j</artifactId>
  <version>1.6.1</version>
</dependency>

<!-- 使dom4j 支持XPath -->
<dependency>
  <groupId>jaxen</groupId>
  <artifactId>jaxen</artifactId>
  <version>1.1.6</version>
</dependency>
```
    
#### dom4j解析xml文件

```java
File inputXml = new File(filePath);
SAXReader saxReader = new SAXReader();
Document document = saxReader.read(inputXml);
Element root = document.getRootElement();
Element propsEle = root.element("properties");
if (propsEle != null) {
    List<Element> eleList = propsEle.elements();
    for (Element ele : eleList) {
        String key = ele.getName();
        String value = ele.getText();
    }
    String eleText = ele.elementTextTrim("eleName");
}
```

#### 创建xml并且格式化输出

```java
Document doc = DocumentHelper.createDocument();
Element project = doc.addElement("project");
Element properties = project.addElement("properties");
Element dependencies = project.addElement("dependencies");
Element dependEle = dependencies.addElement("dependency");
dependEle.addElement("groupId").addText(groupId);
dependEle.addElement("artifactId").addText(artifactId);
            
// 不格式化的话 直接输出这个就行了
String result = doc.asXML();

// 格式化输出xml
try {
    OutputFormat formater = OutputFormat.createPrettyPrint();
    formater.setEncoding("UTF-8");
    StringWriter out = new StringWriter();
    XMLWriter writer = new XMLWriter(out, formater);
    writer.write(doc);
    writer.close();
    result = out.toString();
} catch (IOException e) {
    e.printStackTrace();
}
```

### 参考
  * [java xml教程](http://www.yiibai.com/java_xml/)