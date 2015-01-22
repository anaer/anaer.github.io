---
layout: post
title: "SVN 备忘录"
file: 2014-08-20-subversion.md
update: 2014-10-27 11:33
tags: [SVN]
---

# 问题处理  
 
  * 锁定文件  

      ```
      svn lock filename
      ```

  * 解除锁定  

      ```
      svn unlock filename
      ```

  * svn log 显示修改文件信息

      ```
      svn log -v
      ```

  * svn log 显示修改文件信息 并指定显示日志条数

      ```
      svn log -v -l 5
      ```


