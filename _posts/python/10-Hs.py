#--*-- coding:UTF-8 --*--
'''
Created on 2013-07-30

@author: lvcn

Usage: python Hundsun.py S1314
       创建任务目录
Python: 2.7.3
'''
import os
import sys
import string
import datetime

def initdir(sid):
    dirname='/cygdrive/e/Dropbox/Hs/'+sid
    if os.path.isdir(dirname):
        print '%s already exist!' % dirname
        sys.exit()

    today = datetime.date.today()
    date = today.strftime('%Y')+'-'+today.strftime('%m')+'-'+today.strftime('%d')

    os.makedirs(dirname)

    dir1 = dirname+'/'+sid+'_附件'
    os.makedirs(dir1)
    dir2 = dirname+'/'+sid+'_测试数据'
    os.makedirs(dir2)
    file1 = dirname+'/'+sid+'_测试脚本.sql'
    file = open(file1,'w')
    file.close()

if len(sys.argv) < 2:
    print ' No dirname specified.'
    sys.exit()

for sid in sys.argv[1:]:
    initdir(sid)
