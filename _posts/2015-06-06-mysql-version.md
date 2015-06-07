---
layout: post
title: "Mysql版本比较"
description: "mysql版本比较"
category:Mysql
tags: [Mysql]
---

#### MySQL 4.1/5.0/5.1/5.5/5.6各版本的主要区别

  ```
  1、4.1 增加了子查询的支持，字符集增加UTF-8，GROUP BY语句增加了ROLLUP，mysql.user表采用了更好的加密算法。
  2、5.0 增加了Stored procedures、Views、Cursors、Triggers、XA transactions的支持，增加了INFORATION_SCHEMA系统数据库。
  3、5.1 增加了Event scheduler，Partitioning，Pluggable storage engine API ，Row-based replication、Global级别动态修改general query log和slow query log的支持。
  4、5.5的新特征
    1)默认存储引擎更改为InnoDB
    2)提高性能和可扩展性
      a. 提高了默认线程并发数(innodb_thread_concurrency)
      b. 后台输入/输出线程控制（innodb_read_io_threads、innodb_write_io_threads）
      c. 主线程输入/输出速率控制（innodb_io_capacity）
      d.  操作系统内存分配程序使用控制(innodb_use_sys_malloc)
      e.   适应性散列索引(Hash Index)控制，用户可以关闭适应性散列功能。
      f.   插入缓冲（Insert Buffering）控制，用户可以关闭innodb的插入缓冲功能。
      g.  通过快速加锁算法提高可扩展性，innodb不在使用代理(posix)线程,而是使用原生的独立操作来完成互斥和读写锁定。
      h.  恢复组提交（Restored Group Commit）
      i.   提高恢复性能
      j.  多缓冲池实例
      k.  多个回滚段（Multiple Rollback Segments）,之前的innodb版本最大能处理1023个并发处理操作，现在mysql5.5可以处理高达128K的并发事物，
      l.   Linux系统固有的异步输入/输出，mysql5.5数据库系统也提高了linux系统的输入输出请求的并发数。
      m. 扩展变化缓冲：添加了删除缓冲和清除缓冲
      n.  改善了日志系统互斥和单独刷新（Flush）列表互斥
      o.  改善清除程序进度，在mysql5.5中清楚操作线程是独立的线程，并支持并发，可以使用innodb_purge_treads配置。
      p.  改善事务处理中的元数据锁定。例如，事物中一个语句需要锁一个表，会在事物结束时释放这个表，而不是像以前在语句结束时释放表。
    3)提高实用性
      a.  半同步复制（Semi-synchronous Replication）
      b.  复制Heartbeat
      c.  中继日志自动恢复（Automatic Relay Log Recovery）
      d.  根据服务器过滤项复制（Replication Per Server Filtering）
      e.  从服务器复制支持的数据类型转换（Replication Slave Side Data Type Conversions）
    4)提高易管理性和效率
      a.  建立快速索引（Faster Index Creation）
      b.  高效的数据压缩（Efficient Data Compression）
      c.  为大物件和可变长度列提供高效存储
      d.   增加了INFORMATION_SCHEMA表，新的表提供了与InnoDB压缩和事务处理锁定有关的具体信息。
    5)提高可用性
      a.  针对SIGNAL/RESIGNAL的新SQL语法
      b.   新的表/索引分区选项。MySQL5.5将表和索引RANG和LIST分区范围扩展到了非整数列和日期，并增加了在多个列上分区的能力。
    6)改善检测和诊断
      Mysql5.5引入了一种新的性能架构(performancn_shema,P_S),用于监控mysql监控服务器运行时的性能。
  5、5.6的新特征
      1)InnoDB现在可以限制大量表打开的时候内存占用过多的问题（比如这里提到的）(第三方已有补丁)
      2)InnoDB性能加强。如分拆kernel mutex;flush操作从主线程分离;多个perge线程;大内存优化等
      3)InnoDB死锁信息可以记录到 error 日志，方便分析
      4)MySQL5.6支持延时复制，可以让slave跟master之间控制一个时间间隔，方便特殊情况下的数据恢复。
      5)表分区功能增强
      6)MySQL行级复制功能加强，可以降低磁盘、内存、网络等资源开销（只记录能确定行记录的字段即可）
      7)Binlog实现 crash-safe
      8)复制事件采用crc32校验，增强master/slave 复制数据一致性
      9)新增 log_bin_basename （以前variables里面没有binlog位置信息，对数据库的监管很不方便）
  ```
