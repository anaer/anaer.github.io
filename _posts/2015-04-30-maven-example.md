---
layout: post
title: "maven常用配置"
description: "maven常用配置"
category:Java
tags: [maven]
---

#### maven常用配置

    <properties>
        <apache-logging.version>1.0.3</apache-logging.version>
        <com.alibaba.fastjson>1.2.3</com.alibaba.fastjson>
        <com.alibaba.version>1.0.5</com.alibaba.version>
        <com.google.code.gson.version>2.0</com.google.code.gson.version>
        <com.ibatis.version>2.3.4.726</com.ibatis.version>
        <com.lowagie.version>4.2.1</com.lowagie.version>
        <com.sun.mail.version>1.5.0</com.sun.mail.version>
        <commons-fileupload.version>1.3.1</commons-fileupload.version>
        <commons-httpclient.version>3.0.1</commons-httpclient.version>
        <commons-io.version>2.4</commons-io.version>
        <commons.beanutils.version>1.7.0</commons.beanutils.version>
        <commons.codec.version>1.6</commons.codec.version>
        <commons.collections.version>3.2.1</commons.collections.version>
        <commons.dbcp.version>1.2.2</commons.dbcp.version>
        <commons.fileupload.version>1.2.1</commons.fileupload.version>
        <commons.lang.version>2.4</commons.lang.version>
        <commons.logging.version>1.1.1</commons.logging.version>
        <it.sauronsoftware.cron4j.version>2.2.5</it.sauronsoftware.cron4j.version>
        <junit.version>4.11</junit.version>
        <log4j.version>1.2.17</log4j.version>
        <mysql.version>5.1.32</mysql.version>
        <ojdbc6.version>11.2.0.3.0</ojdbc6.version>
        <org.apache.ant.version>1.9.4</org.apache.ant.version>
        <org.apache.commons.version>2.0.0</org.apache.commons.version>
        <org.apache.cxf.version>2.5.0</org.apache.cxf.version>
        <org.apache.lucene.analyzers.version>3.6.2</org.apache.lucene.analyzers.version>
        <org.apache.lucene.version>4.8.1</org.apache.lucene.version>
        <org.apache.poi.version>3.10-FINAL</org.apache.poi.version>
        <org.apache.tomcat.version>8.0.5</org.apache.tomcat.version>
        <org.apache.velocity.version>1.7</org.apache.velocity.version>
        <org.eclipse.persistence.version>2.1.0</org.eclipse.persistence.version>
        <org.hibernate.version>3.5.6-Final</org.hibernate.version>
        <org.htmlparser.version>2.1</org.htmlparser.version>
        <org.jodd.version>3.3.8</org.jodd.version>
        <org.jsoup.version>1.7.3</org.jsoup.version>
        <org.mongodb.version>2.12.2</org.mongodb.version>
        <org.springframework.version>4.0.4.RELEASE</org.springframework.version>
        <velocity-tools.version>1.4</velocity-tools.version>
        <javax.ws.rs.version>1.1.1</javax.ws.rs.version>
    </properties>
    
    <dependencies>
          <!-- jodd工具包 -->
        <dependency>
            <groupId>org.jodd</groupId>
            <artifactId>jodd</artifactId>
            <version>${org.jodd.version}</version>
        </dependency>

        <!-- 单元测试 -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>${junit.version}</version>
        </dependency>
        <!-- 日志输出 -->
        <dependency>
            <groupId>apache-logging</groupId>
            <artifactId>commons-logging-api</artifactId>
            <version>${apache-logging.version}</version>
        </dependency>

   <!-- Lucene -->
        <dependency>
            <groupId>org.apache.lucene</groupId>
            <artifactId>lucene-core</artifactId>
            <version>${org.apache.lucene.version}</version>
        </dependency>

        <dependency>
            <groupId>org.apache.lucene</groupId>
            <artifactId>lucene-analyzers-common</artifactId>
            <version>${org.apache.lucene.version}</version>
        </dependency>

        <dependency>
            <groupId>org.apache.lucene</groupId>
            <artifactId>lucene-misc</artifactId>
            <version>${org.apache.lucene.version}</version>
        </dependency>

        <dependency>
            <groupId>org.apache.lucene</groupId>
            <artifactId>lucene-analyzers</artifactId>
            <version>${org.apache.lucene.analyzers.version}</version>
        </dependency>

        <dependency>
            <groupId>org.apache.lucene</groupId>
            <artifactId>lucene-queryparser</artifactId>
            <version>${org.apache.lucene.version}</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>${com.alibaba.version}</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.mongodb</groupId>
            <artifactId>mongo-java-driver</artifactId>
            <version>${org.mongodb.version}</version>
            <scope>provided</scope>
        </dependency>
        <!-- 定时任务包，类似crontab -->
        <dependency>
            <groupId>it.sauronsoftware.cron4j</groupId>
            <artifactId>cron4j</artifactId>
            <version>${it.sauronsoftware.cron4j.version}</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.tomcat</groupId>
            <artifactId>tomcat-servlet-api</artifactId>
            <version>${org.apache.tomcat.version}</version>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-api</artifactId>
            <version>${org.apache.cxf.version}</version>
        </dependency>

        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-frontend-jaxws</artifactId>
            <version>${org.apache.cxf.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-bindings-soap</artifactId>
            <version>${org.apache.cxf.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-transports-http</artifactId>
            <version>${org.apache.cxf.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-ws-security</artifactId>
            <version>${org.apache.cxf.version}</version>
        </dependency>
    <dependencies>
    
    
#### maven仓库

```xml
<repository>
    <id>oschina</id>
    <url>http://maven.oschina.net/content/groups/public/</url>
</repository>
<repository>
    <id>sonatype</id>
    <url>http://repository.sonatype.org/content/groups/public/</url>
</repository>
<repository>
    <id>datanucleus</id>
    <url>http://www.datanucleus.org/downloads/maven2/</url>
</repository>
<repository>
    <id>ibiblio</id>
    <url>http://mirrors.ibiblio.org/pub/mirrors/maven2/</url>
</repository>
<repository>
    <id>gwt-maven</id>
    <url>http://gwt-maven.googlecode.com/svn/trunk/mavenrepo/</url>
</repository>
<repository>
    <id>maven2-repository.dev.java.net</id>
    <url>http://download.java.net/maven/2/</url>
</repository>
<repository>
    <id>jboss</id>
    <url>http://repository.jboss.com/maven2</url>
</repository>
<repository>
    <id>gilead-maven-repo</id>
    <url>https://gilead.svn.sourceforge.net/svnroot/gilead/gilead/maven-repo</url>
</repository>
<repository>
    <id>hibernat4gwt-repo</id>
    <url>https://hibernate4gwt.svn.sourceforge.net/svnroot/hibernate4gwt/branches/jens_meiss/maven/</url>
</repository>
<repository>
    <id>gilead-repo</id>
    <name>Gilead Maven Repository</name>
    <url>https://gilead.svn.sourceforge.net/svnroot/gilead/gilead/maven-repo</url>
</repository>
```