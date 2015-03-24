查询表最后修改时间
select uat.table_name as 表名,
       (select last_ddl_time
          from user_objects
         where object_name = uat.table_name
         and object_type='TABLE') as 最后修改日期
  from user_all_tables uat;
