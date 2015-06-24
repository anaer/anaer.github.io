---
layout: post
title: "Mysql安装"
description: "mysql安装"
category:Mysql
tags: [Mysql]

---

### 安装Mysql
#### Cygwin下安装Mysql
安装的有点问题，按下面这个流程暂时可用，后期再完善吧。

1. `apt-cyg install mysql`
2. `apt-cyg install mysqld`
3. `cp /usr/share/mysql/my-medium.cnf /etc/my.cnf`
4. `vim my.cnf`

修改端口 修改配置

```
[mysqld]
character_set_server=utf8
collation-server=utf8_general_ci
lower_case_table_names=1
character_set_client=utf8

[mysql]
default-character-set = utf8
```

    (注意linux下mysql安装完后是默认：区分表名的大小写，不区分列名的大小写；lower_case_table_names = 0    0：区分大小写，1：不区分大小写)

5. 执行/usr/bin/mysql_install_db
6. 启动mysql

```
. /usr/bin/mysqld_safe --user=root &

启动: /usr/share/mysql/mysql.server start
停止: /usr/share/mysql/mysql.server stop
重启: /usr/share/mysql/mysql.server restart
```

#### windows下如何在一台机器上安装两个MYSQL数据库
  * 环境:
  OS:Win7
  DB:Mysql5.5
    Mysql安装路径:C:\Program Files\MySQL
  Mysql服务名:Mysql
  * 在控制面板中停止Mysql服务
  * 拷贝Mysql安装目录到C:\Program Files\MySQL2
  * 修改my.ini,
  路径:C:\Program Files\MySQL2\MySQL Server 5.5\my.ini

  ```ini
  [client]
  port=3307

  [mysqld]
  port=3307
  basedir="C:/Program Files/MySQL2/MySQL Server 5.5/"
  datadir="C:/ProgramData/MySQL2/MySQL Server 5.5/Data/"
  ```

  * 创建启动服务

  ```cmd
  cd "C:\Program Files\MySQL2\MySQL Server 5.5\bin"
  mysqld install MySQL2  --defaults-file="C:\Program Files\MySQL2\MySQL Server 5.5\my.ini"
  ```

  * 删除服务

  ```cmd
  mysqld.exe remove mysql2
  ```

  * 启动/停止服务

  ```cmd
  net start mysql2
  net stop mysql2
  ```

### 参考
* [MySQL 5.5(rpm格式)server 和client 在Linux 上安装](http://blog.csdn.net/jiang5013/article/details/7475339)
* [Mysql:is not allowed to connect to this MySQL server](http://www.blogjava.net/acooly/archive/2008/09/17/229368.html)
* [Windows7下安装Mysql](http://blog.csdn.net/a672489861/article/details/11669697)
