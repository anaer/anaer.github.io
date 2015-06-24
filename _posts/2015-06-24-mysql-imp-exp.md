---
layout: post
title: "mysql导入导出备份"
description: "mysql导入导出备份"
category:mysql
tags: [mysql]

---

#### 数据备份还原
  1. 数据备份
    1.1 命令备份

      ```cmd
      mysqldump -u username -p dbname table1 table2 ... > BackupName.sql
      dbname 参数表示数据库的名称；table1 和table2 参数表示表的名称，没有该参数时将备份整个数据库；
      BackupName.sql 参数表示备份文件的名称，文件名前面可以加上一个绝对路径。通常以sql 作为后缀。
      首先先打开CMD,然后cd到mysql的安装目录下的bin,然后执行命令

      mysqldump -u root -p test > 20101216_test.sql 导出数据
    mysqldump -h localhost -u root -p dbname > 111.sql
      ```
    1.2 使用mysql图形工具备份
  2. 数据还原
    2.1 使用mysql命令还原

      ```cmd
      mysql -u root -p [dbname] < backup.sql
      dbname 参数表示数据库名称。该参数是可选参数，可以指定数据库名，也可以不指定。指定数据库名时，表示还原该数据库下的表。不指定数据库名时，表示还原特定的一个数据库。而备份文件中有创建数据库的语句。

      mysql -u root -p -h test < 20101216_test.sql 导入数据
      ```
    2.2 使用图形工具还原

#### 导出建表语句 带注释

```
导出（只导数据结构）

mysqldump -u root -p -d --add-drop-table 数据库名字 >导出的文件名

导出（包括数据）

mysqldump -u root -p --add-drop-table 数据库名字 >导出的文件名

全数据库

mysqldump -u root -p --all-database>backup.sql


导入:

source D:/mysql-study/InsertTest.sql   (某些GUI工具中,需要备份的文件版本要一致)

mysql -uroot -proot test <D:/Mysql-study/insertTest.sql
```
