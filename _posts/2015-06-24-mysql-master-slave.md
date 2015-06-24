---
layout: post
title: "mysql主从配置"
description: "mysql主从配置"
category:mysql
tags: [mysql]

---

### mysql主主配置 两台服务器互为主从

```
0. 数据库列表:
A: 192.168.106.111
B: 192.168.0.45

1. 创建同步用户 AB服务器互为主从

A:
mysql> grant replication slave on *.* to 'replicate'@'192.168.0.45' identified by 'password';
mysql> flush privileges;

B:
mysql> grant replication slave on *.* to 'replicate'@'192.168.106.111' identified by 'password';
mysql> flush privileges;

2. 配置my.cnf
A:
# /etc/my.cnf
[mysqld]

# as master
server-id=1                   # 主机id，整数
#开启二进制日志，并且名称为 /var/lib/mysql/mysql-bin.***
log-bin=mysql-bin
read-only=0                   # 主机读写权限，读写都可以
binlog-do-db=mydb              # 记录日志的数据库：需要的备份数据，多个写多行
binlog-ignore-db=mysql        # 不记录日志的数据库：不需要备份的数据库，多个写多行
binlog-ignore-db=test
binlog-ignore-db=information_schema
binlog-ignore-db=performance_schema

# as slave
replicate-do-db=mydb           # 只复制某个库，多个写多行
replicate-ignore-db=mysql     # 不复制某个库
replicate-ignore-db=test
replicate-ignore-db=information_schema
replicate-ignore-db=performance_schema
relay-log=mysqld-relay-bin    # 开启日志中继
log-slave-updates             # slave将复制事件写进自己的二进制日志

# 自增字段奇数递增，防止冲突（1, 3, 5, ...,）
auto-increment-increment = 2  # 每次递增的步长
auto-increment-offset = 1     # 初始值

B:
# /etc/my.cnf
[mysqld]

# as slave
server-id=2
log-bin=mysql-bin
replicate-do-db=mydb           # 只复制某个库，多个写多行
replicate-ignore-db=mysql     # 不复制某个库
replicate-ignore-db=test
replicate-ignore-db=information_schema
replicate-ignore-db=performance_schema
relay-log=mysqld-relay-bin    # 开启日志中继
log-slave-updates             # 示slave将复制事件写进自己的二进制日志

# as master
#开启二进制日志，并且名称为 /var/lib/mysql/mysql-bin.***
log-bin=mysql-bin
read-only=0                   # 主机读写权限，读写都可以
binlog-do-db=mydb              # 记录日志的数据库：需要的备份数据，多个写多行
binlog-ignore-db=mysql        # 不记录日志的数据库：不需要备份的数据库，多个写多行
binlog-ignore-db=test
binlog-ignore-db=information_schema
binlog-ignore-db=performance_schema


# 自增字段偶数递增，防止冲突（2, 4, 6, ...,）
auto-increment-increment = 2  # 每次递增的步长
auto-increment-offset = 2     # 初始值


3. 重启数据库
$ /etc/init.d/mysql restart

4. 锁定数据库, 导出主数据库
mysql> FLUSH TABLES WITH READ LOCK;
新开终端导出数据库 -R 同时导出存储过程
mysqldump --master-data -uroot -p -R mydb > mydb.sql

5. 查看主服务器状态 记录File和Position
mysql> show master status\G;
*************************** 1. row ***************************
            File: mysql-bin.000017
        Position: 107
    Binlog_Do_DB: mydb
Binlog_Ignore_DB: mysql
1 row in set (0.00 sec)


6. 解锁数据库
mysql> unlock tables;

7. 从数据库导入主数据库的数据
mysql> create database mydb default charset utf8;
mysql -uroot -p mydb < mydb.sql

8. 查询从服务器的master状态 记录File和Position

9. 配置master信息
如果已配置过slave信息, 先停止
mysql> slave stop;

A:
mysql> change master to master_host='192.168.0.45',master_user='replicate',master_password='password',master_log_file='mysql-bin.000009',master_log_pos=248356;

B:
mysql> change master to master_host='192.168.106.111',master_user='replicate',master_password='password',master_log_file='mysql-bin.000018',master_log_pos=107;

/var/lib/mysql/master.info

10. 启动savle；slave start,start slave都可以
mysql> slave start;

11. 查看从服务器slave状态
mysql> show slave status\G;

Slave_IO_Running: Yes
Slave_SQL_Running: Yes

12. 删除主从
mysql> change master to master_host=' ';

13. 设置中文编码 默认还是utf8
mysql> set names gbk;
```

# Mysql主从配置
* 需要两台mysql服务器, 可以同一主机 端口不同, 且主mysql版本不得高于从mysql
* 修改主服务器master:

```ini
[mysqld]
#[必须]启用二进制日志
log-bin=mysql-bin
#[必须]服务器唯一ID，默认是1，一般取IP最后一段
server-id=1
```

* 修改从服务器slave:

```ini
[mysqld]
#[必须]启用二进制日志
log-bin=mysql-bin
#[必须]服务器唯一ID，默认是1，一般取IP最后一段
server-id=2
```

* 重启两个mysql服务

* 在主服务器上授权给slave，并查询master的状态信息

```sql
#授权账号root@某个机器上，授权密码是password。
GRANT REPLICATION slave ON *.* to 'root'@'localhost' identified by 'password';
#查询master的状态信息，为配置slave使用
show master status;

--------------------------
File				Position
mysql-bin.000001	1409
```

* 配置从服务器slave:

```sql
# 后面两个参数要与上面查出来的结果保持一致
CHANGE MASTER to MASTER_HOST='localhost',MASTER_USER='root',MASTER_PASSWORD='password', MASTER_LOG_FILE='mysql-bin.000001',MASTER_LOG_POS=1409;

# 检查从服务器复制功能状态
show slave status;
```

### 参考
* [windows下如何在一台机器上安装两个MYSQL数据库](http://blog.chinaunix.net/uid-77311-id-3450734.html)
* [mysql 主从配置 ](http://blog.csdn.net/huoyunshen88/article/details/26597483)
* [mysql双机热备份的实现步骤](http://linux.chinaunix.net/techdoc/database/2008/07/28/1021365.shtml)
* [MySQL双机热备份实施方案](http://blog.csdn.net/sleepbird/article/details/1745261)
* [MySql主从备份](http://blog.csdn.net/libraworm/article/details/1703365)
* [mysql 基于 master-master 的双机热备配置](http://mozillazg.com/2013/06/mysql-master-master.html)
* [Mysql双机热备实现](http://yunnick.iteye.com/blog/1845301)
* [Spring+Hibernate框架下MySql读写分离，主从数据库配置 ](http://blog.csdn.net/lifuxiangcaohui/article/details/7280202)
