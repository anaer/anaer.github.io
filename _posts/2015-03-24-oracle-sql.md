---
layout: post
title: "Oracle常用sql"
file: 2015-03-24-oracle-sql.md
update: 2015-03-24 13:40
description: "Oracle常用sql"
category:Oracle
tags: [Oracle, sql]

---

--Admin123

--用户管理
select * from dba_users; --查看数据库里面所有用户，前提是你是有dba权限的帐号，如sys,system
select * from all_users where user_id > 65 order by created;  --查看你能管理的所有用户！
select * from user_users; --查看当前用户信息 ！

select 'drop user '||username||' cascade;' from all_users where user_id between 93 and 103;

--查询表信息
select 'select * from '||table_name||';' from dba_tables where owner='S1536';

--删除用户
drop user t001 cascade;

--删除表空间
select * from dba_tablespaces;
DROP TABLESPACE TEST__TEMP INCLUDING CONTENTS AND DATAFILES;

--创建用户
create user ita
identified by hundsun
default tablespace orcl
temporary tablespace temp
QUOTA UNLIMITED ON t1;

CREATE USER ita IDENTIFIED BY  hundsun DEFAULT TABLESPACE USERS TEMPORARY TABLESPACE TEMP;

--赋权限
grant connect,resource,dba,create table,create view to ita;
grant connect,resource,dba,create table,create view to scott;

--空间扩展
--非临时表空间：
select * from dba_data_files;
select file_id from dba_data_files where tablespace_name='T1';

alter database datafile 6 autoextend on next 10M maxsize 10G;
--临时表空间：
select * from dba_temp_files;
select file_id from dba_temp_files where tablespace_name=<your_tablespace_name>;

alter database tempfile <file_id> autoextend on next 10M maxsize 10G;

--查询所有表
select * from ALL_TABLES where tablespace_name ='TABLESPACE_DATA';

--查询用户下所有表 用于ibatis自动生成
select '<table tableName="'||table_name||'"/>' from dba_tables where owner='USERNAME';

#### 查询表最后修改时间

```sql
select uat.table_name as 表名,
       (select last_ddl_time
          from user_objects
         where object_name = uat.table_name
         and object_type='TABLE') as 最后修改日期
  from user_all_tables uat;

```

#### 数据库连接串

 conn scott/tiger@orcl as sysdba;
 
#### Oracle order by 排序 默认升序
asc 升序
desc 降序

#### 置默认值
update st_info t set t.first_input_date=default, t.first_input_time=default;

#### 解锁oracle用户
alter user scott account unlock;


### 常用sql总结
基础

1：创建数据库
CREATE DATABASE dbname

2：删除数据库
DELETE DATABASE dbname

3：备份sql server
创建备份数据的device：
USE master EXEC sp_addumpdevice 'disk', 'testBack', 'c:/mssql7backup/MyNwind_1.dat'

开始备份：
BACKUP DATABASE PUBS TO testback

4：创建新表
        
    crate table table-name(col1 type1 [not null] [primary key] , col2 type2 [not null],……………)

根据已有的表创建新表
使用新表创建新表：select * into newTable from oldTable

5：删除表
drop table tableName

6：增加一个列，删除一个列
A：alter table tableName add column col type
B：alter table tableName drop column columnname

7：添加主键
alter table tablename add primaryKey col
删除主键
alter table tablename drop primaryKey col

8：创建索引
create [unique] index idxname on tabname(col，，，，）
删除索引
drop index indexname

9：创建视图
create view viewName as select statement
删除视图
drop view viewName

10：几个简单的基本的SQL语句
选择：select * from table where 范围
插入：insert into table1(field1, field2) values (values1,values2)
删除：delete from table wheree 范围
更新：update table1 set field1 = value1 where 条件
查找：select from table where field1 like '%value1%'
排序：select * from table oder by field1,field2 (desc)
总数：select count as totalcount from table
求和：select sum(field1) as sumvalue from table 1
求平均值：select avg(field1) as avgvalue from table1
求最大值：select max（field1） as maxvalue from table1
求最小值：select min（field1） as minvaluie from table1

11：几个高级查询关键词

A：UNION,通过组合两个结果表而派生出一个新的结果表。当单独使用Union的时候，会消除重复行；当使用Union ALL的时候，不会消除重复行

B：Except ，通过所有包含在table1 而不在table2中的行，并且消除所有的重复行，而派生出来的一个结果表。当与ALL一同使用的时候，不会消除重复行。

C：INTERSECLT：INTERSECT 运算符通过只包括 TABLE1 和 TABLE2 中都有的行并消除所有重复行而派生出一个结果表。当 ALL 随 INTERSECT 一起使用时 (INTERSECT ALL)，不消除重复行

12：使用外链接
left join:
左外联结：结果集包括连接表的匹配行，也包括左联结表的所有行
SQL：select a.a, a.b, a.c, b.c, b.d, b.f from a LEFT OUT JOIN b ON a.a = b.c
right join:
右外联结：结果集既包括连接表的匹配行，也包括右连接表的所有行
full/cross join
全外连接：不仅包括符号连接表的匹配行，还包括两个链接表的所有记录。

13：分组 group by
在select统计函数中的字段，不能和普通的字段放在一起；
