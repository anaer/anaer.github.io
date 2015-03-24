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
