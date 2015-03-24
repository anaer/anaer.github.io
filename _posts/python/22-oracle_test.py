#--*-- coding:UTF-8 --*--
'''
Created on 2013-08-27

@author: lvcn

Usage: Oracle 数据库连接测试

Python: 2.7.3
'''
import cx_Oracle
username='test1'
password='test1'
orcl='127.0.0.1:1521/orcl'
o = cx_Oracle.connect(username , password , orcl)
cur = o.cursor()
cur.execute('select sysdate from dual')
for row in cur:
        print row
cur.description
