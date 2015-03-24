cd D:\sqlsrc
for /f "tokens=*" %i in ('dir /b *.sql') do echo @%i >> abc.sql
sqlplus test1/test1@orcl @abc.sql
