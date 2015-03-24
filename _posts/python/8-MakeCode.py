#--*-- coding:utf8 --*--
'''
Created on 2013-07-29

@author: lvcn

Usage: python MakeCopy.py 123.py 234 345
       按模板生成Python代码文件, 支持同时生成多个文件
Python: 2.7.3
'''
import os
import sys
import string
import datetime

def createfile(filename):
    if os.path.isfile(filename):
        print '%s already exist!' % filename 
        sys.exit()
    today = datetime.date.today()
    date = today.strftime('%Y')+'-'+today.strftime('%m')+'-'+today.strftime('%d')
    filetypes = string.split(filename,'.')
    length = len(filetypes)
    filetype = filetypes[length-1]

    if filetype != 'py':
        filename = filename+'.py'

    file = open(filename,'w')

    print 'use python mode'
    file.writelines('# --*-- coding:utf8 --*--')
    file.write('\n')
    file.write("'''")
    file.write('\n')
    file.write('Created on '+date)
    file.write('\n')
    file.write('\n')
    file.write('@author:lvcn')
    file.write('\n')
    file.write('\n')
    file.write('Usage:')
    file.write('\n')
    file.write('\n')
    file.write('python:2.7.3')
    file.write('\n')
    file.write("'''")
    file.write('\n')
    file.close()


if len(sys.argv) < 2:
    print ' No filename specified.'
    sys.exit()

for filename in sys.argv[1:]:
    createfile(filename)

