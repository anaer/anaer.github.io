#-*- coding: utf-8 -*-
'''
Created on 2012-10-24

@author: guogc

Usage: 按配置要求 删除计算机指定(多个目录)类型(多种类型)的文件，请慎重使用！

'''
import os
import glob
import datetime

Reconfirmed = 1 
#1:需要人工输入 二次 确认后删除，其他值不用二次确认，直接删除

dirs = [r'E:\123',    \
        r'E:\234',  \
        r'C:\345'   
        ]

#指定的文件后缀
fileSuffix = ['.log','.jpg']

def rmFiles(dir):
    if(len(dir)==0 or (not os.path.exists(dir))): return
    
    for file in glob.glob(dir + os.sep + "*"):
        if(os.path.isdir(file)):
            rmFiles(file)
        else:
            if(os.path.splitext(file)[1] in fileSuffix):
                #如果文件后缀匹配
                    printLog("    删除文件 %s "%file)
                    os.remove(file)

def __getOsSysTime__():
    return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

def printLog(info):
    print("[%s] %s"%(__getOsSysTime__(),info))

if(__name__ == '__main__'):
    for d in dirs:
        if(Reconfirmed == 1):
            printLog("准备删除目录 [%s] 下，后缀为 %s 的文件,请确认? "%(d,fileSuffix))
            flag = input("【确认删除,请输入 (Y or y) 字符，其他跳过删除】\n");
            if(flag.lower() == 'y'):
                rmFiles(d)
            else:
                printLog("您已经确认，不删除该目录(%s)下指定文件！\n"%d)
        else:
            #无需人工确认，直接删除
             rmFiles(d)
    else:
        printLog(" 【删除完成】")
