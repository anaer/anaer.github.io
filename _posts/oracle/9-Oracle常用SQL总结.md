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