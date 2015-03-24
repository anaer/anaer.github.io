#-*- coding: utf-8 -*-
'''
Created on 2012-9-7
@author: guogc
Usage : 从SQL脚本中查询信息(需要python安装环境支持中文噢)
        可以直接使用命令查询, -e支持正则表达式查询
        find . -name "*.sql" | xargs grep -e create.*table
Python: 2.7.3
'''
import glob
import os
import re

#查询目录
sqlDir = r"D:\sqlDir"

#查询关键字,不区分大小写
fileds = ['tDepositQuarterShrCrt','create','table']

macthMode = 1  #匹配模式，1是匹配单词，否则模糊匹配
#文件后缀列表
fileSuffix = ['.sql']

sqlFils = []

def _querySqlFiles(dir):
    if(len(dir) == 0):return
    if(not os.path.exists(dir)):return

    for f in glob.glob(dir + os.sep + "*"):
        if(os.path.isdir(f)):
            _querySqlFiles(f)
        else:
         if(os.path.splitext(f)[1] in fileSuffix):
             sqlFils.append(f)

def _trim(string = ''):
    '''[除去字符串前后的空白，包含' ' \n \t \r]'''
    return string.strip(' \n\r\t')

def _queryFiled(file,fileds):
    if((not os.path.exists(file)) or (len(fileds) == 0)):return None
    line = 1
    try:
        f = open(file,'r')
        txt = f.readline().upper()
        while(len(txt)>0):
            #循环判断改行是否存在要搜索的
            isMatch = True
            for fild in fileds:
                patten = _trim(fild.upper())
                if(macthMode == 1): #按单词独立匹配
                    patten = r'\b'+_trim(fild.upper())+r'\b'

                if((re.search(patten, txt) == None)): #其中一个不匹配
                    isMatch = False
                    break

            if(isMatch == True):#全部匹配，输出
                print ('%s ,Filed=%s line [%s]' %(file,fileds,line))
                print (" %s" %txt)

            txt = f.readline().upper()
            line +=1
        f.close()
    except(IOError,OSError):
         print (' 文件搜索失败 File=%s,Filed=%s' %(file,fileds))

def __printFile__(file = None):
    if(file == None):return ''

    import os
    if(not os.path.exists(file)):return ''
    try:
        f = open(file,'r')
        while True:
            line = f.readline()
            if(len(line) ==0):break
            #print (line,end='')
    except:
        print ('Open File %s Err.'% file)

if(__name__ == "__main__"):
    _querySqlFiles(sqlDir)

    for f in sqlFils:
        _queryFiled(f, fileds)

   # __printFile__(r'Open File E:\java\eclipse\workspace\PythonStu\src\python01.py')
