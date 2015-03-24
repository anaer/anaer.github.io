#-*- coding: utf-8 -*-
'''
Created on 2013-07-26
@author:lvcn
Usage:下载测试
Python Version:2.7.3
'''
import urllib,re
import os
import sys

def getLastinstall():
    url = sys.argv[1]
    name = sys.argv[2]
    if url is not None and name is not None:
        localpath = os.getcwd()+name
        urllib.urlretrieve(url,name)    

if __name__ =='__main__':
    getLastinstall()
