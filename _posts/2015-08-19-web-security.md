---
layout: post
title: "web安全配置"
description: "web安全配置"
category:security
tags: [security]

---

#### Tomcat安全配置
* 删除Tomcat的Manager控制台软件
删除%Tomcat_home%\webapps\manager文件夹
如无法做到删除，请参考以下步骤检查弱口令：

* 检查Tomcat弱口令
打开%Tomcat_home%\conf\tomcat-users.xml，查看设置的用户密码及角色，例如：
<role rolename="manager"/>
<user username="tomcat" password="复杂的密码" roles="manager"/>
在tomcat-users.xml中为用户设置复杂的密码

* 防止恶意用户telnet到8005端口后，发送SHUTDOWN命令停止Tomcat服务
打开%Tomcat_home%\conf\server.xml，查看是否设置了复杂的字符串
<Server port="8005" shutdown="复杂的字符串">
设置复杂的字符串，防止恶意用户猜测到

* 以Tomcat用户运行服务，增强安全性
查看Tomcat的启动脚本或服务，是否以Tomcat身份运行
Unix系统：
(1) 创建apache组：groupadd tomcat
(2) 创建apache用户并加入apache组：useradd tomcat –g tomcat
(3) 以tomcat身份启动服务

* 防止直接访问目录时由于找不到默认主页而列出目录下文件
打开%Tomcat_home%\conf\web.xml，查看listings是否设置为false
<init-param>
    <param-name>listings</param-name>
    <param-value>false</param-value>
</init-param>
将listings的值修改为false

* 对敏感目录的访问IP或主机名进行限制
打开%Tomcat_home%\conf\Catalina\localhost\manager.xml
查看是否设置有IP或主机名限制
修改%Tomcat_home%\conf\Catalina\localhost\manager.xml，在Context标签中加入
<Valve className="org.apache.catalina.valves.RemoteAddrValve"
        allow="192.168.1.*" />
或者
<Valve className="org.apache.catalina.valves.RemoteHostValve"
        allow="*.localdomain.com" />

* 检查Tomcat是否记录了错误信息和访问信息
Tomcat的日志信息默认存放在%Tomcat_home%\logs中，访问日志默认未开启
如果Tomcat独立运行（未与Apache整合），可以选择开启访问日志，修改%Tomcat_home%\conf\server.xml，取消注释：
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"  
prefix="localhost_access_log." suffix=".txt" pattern="common" resolveHosts="false"/>
启用access_log后，重启tomcat，在%Tomcat_home%\logs中可以看到访问日志

* 自定义Tomcat返回的错误信息
查看%Tomcat_home%\webapps\APP_NAME\WEB-INF\web.xml中<error-page> </error-page> 部分的设置
修改%Tomcat_home%\webapps\APP_NAME\WEB-INF\web.xml
在最后</web-app>一行之前加入以下内容
（1）表示出现404未找到网页的错误时显示notfound.html页面
<error-page> 
<error-code>404</error-code>
<location>/nofound.html</location> 
</error-page>
（2）表示出现java.lang.NullPointerException错误时显示 error.jsp页面
<error-page>
<exception-type>java.lang.NullPointerException</exception-type>
<location>/ error.jsp</location> 
</error-page>

#### apache安全配置
* 端口配置
对外服务http使用80端口，SSL使用443端口；且只允许80运行http访问，其他服务严禁运行在80端口。

* 目录禁止配置为可浏览，关闭服务器端SSI包含
Options -Indexes -Includes

* 配置覆盖控制
将AllowOverride设置为None
防止通过.htaccess覆盖原有安全配置

* 控制对root目录的访问
<Directory />
Options None 
AllowOverride None 
deny from all 
</Directory>
开放指定目录: 
<Directory "/var/www/html/"> 
Order allow,deny 
allow from all 
</Directory>

#### MySql安全配置
* 移除Anonymous帐号
Delete from mysql.user where user = ''; mysql缺省有一个空用户。

### 安全编码规范
#### 防范XSS漏洞
* 漏洞描述
XSS又叫CSS (Cross Site Script) ，跨站脚本攻击。它指的是恶意攻击者往Web页面里插入恶意html代码，当用户浏览该页之时，嵌入其中Web里面的html代码会被执行，从而达到恶意攻击用户的特殊目的。

* 安全风险
获取用户cookie、钓鱼、获取用户页面数据、蠕虫、挂马。

* 编码规范
在velocity中对输出变量进行了防xss的处理，处理措施包括编码转义和过滤。

#### 防范SQL注入漏洞
* 漏洞描述
所谓SQL注入，就是通过将构造的SQL命令作为数据提交到web服务器，web服务器对这些数据没有适当的处理，而交给数据库服务器执行，导致攻击的发生。
* 安全风险
数据库资料被窃取、修改或者删除，服务器被攻击者控制。
* 编码规范
在ibatis中写SQL语句时，请使用##绑定变量，禁止使用$$的方式。
正确示例：
 <select
 parameterClass="java.util.HashMap"   resultClass="java.util.HashMap">
 <![CDATA[SELECT * FROM  user WHERE ID = #value#]]>
 </select>
需要注意的是模糊查询语句的写法，针对不同的数据库写法不同：
oracle的写法： like '%'||#name#||'%'
Mysql的写法： like CONCAT('%', #name#, '%')
SQLServer的写法： like '%' + #name# +  '%'

#### 防范CSRF漏洞
* 漏洞描述
CSRF是伪造客户端请求的一种攻击，CSRF的英文全称是Cross Site Request Forgery，字面上的意思是跨站点伪造请求。CSRF的定义是强迫受害者的浏览器向一个易受攻击的Web应用程序发送请求,最后达到攻击者所需要的操作行为。

* 安全风险
伪造用户请求、修改用户参数、xss蠕虫。
