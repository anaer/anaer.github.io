#-*- coding: utf-8 -*-
'''
Created on 2013-07-26

@author:lvcn

Usage:下载测试

Python Version:2.7.3
'''
import urllib
import os

def getLastinstall():
    downurlstd = r'http://go.microsoft.com/fwlink/?LinkID=87342'
    localpath = os.getcwd()+r'/installpack/mpam-fe.exe'
    if not os.path.isdir('installpack'):
        os.makedirs('installpack')        
    urllib.urlretrieve(downurlstd,localpath)    

if __name__ =='__main__':
    getLastinstall()
