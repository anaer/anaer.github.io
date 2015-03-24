#/usr/local/bin/svn commit /cygdrive/e/deadcode/Configuration/ -m '自动提交配置信息'
#/usr/local/bin/svn commit /cygdrive/e/deadcode/python/sample/ -m '提交py代码'
#自动提交修改文件
#awk print 文件名中如果包含了空格也被作为分割符处理了
#/usr/local/bin/svn status /cygdrive/e/deadcode|grep -e ^[AMD]|awk '{print $2}'|xargs /usr/local/bin/svn ci -m 'autocommit'
#cut 以单个空格作为分隔符， 8- 表示8以后的全部显示
/usr/local/bin/svn status /cygdrive/e/deadcode|grep -e ^[AMD]|cut -d ' ' -f 8- --output-delimiter='\ '|xargs /usr/local/bin/svn ci --non-interactive --trust-server-cert -m 'autocommit'
