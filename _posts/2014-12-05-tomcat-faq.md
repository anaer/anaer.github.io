---
layout: post
title: "tomcat faq"
description: "tomcat faq"
category: java
tags: [tomcat]

---

### Tomcat 启动问题

#### [WARNING] Unable to process class com/ibm/icu/impl/data/LocaleElements_zh__PINYIN.class in JarAnalyzer File icu4j-2.6.1.jar  Invalid byte tag in constant pool: 60
    pom.xml中过滤icu4j
    <exclusion>
      <artifactId>icu4j</artifactId>
      <groupId>com.ibm.icu</groupId>
    </exclusion>

#### The Apache Tomcat Native library which allows optimal performance in production environments was not found ……
    下载tcnative-1.dll文件放到path目录下, 有32位/64位 不同会报错

#### 解决SSL证书PKIX问题
[解决SSL证书PKIX问题](http://my.oschina.net/topeagle/blog/416139)

#### java.lang.IllegalStateException: BeanFactory not initialized or already closed - call 'refresh' before accessing beans via the ApplicationContext
    重新编译

#### JRebel-SDK-CBP: ERROR Class 'org.apache.ibatis.reflection.Reflector' could not be processed by org.zeroturnaround.jrebel.mybatis.cbp.ReflectorCBP@org.apache.catalina.loader.WebappClassLoader@60f017: org.zeroturnaround.bundled.javassist.NotFoundException: forClass(..) is not found in org.apache.ibatis.reflection.Reflector
    mybatis要用3.2.7, 3.3.0版本中Reflector类缺少forClass方法

#### WARN CacheConfiguration - Cache 'Cache1' is set to eternal but also has TTI/TTL set.  To avoid this warning, clean up the config removing conflicting values of eternal, TTI and TTL. Effective configuration for Cache 'Cache1' will be eternal='true', timeToIdleSeconds='0', timeToLiveSeconds='0'.
    可以不管，或者修改ehcache.xml中配置