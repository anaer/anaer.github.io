#-*- coding: utf-8 -*-
'''
Created on 2013-07-25
@author:lvcn
Usage:文件IO测试
Python:2.7.3
'''
spath="D:/abc.txt"
f=open(spath,"w") # Opens file for writing. Creates this file doesn't exist.
f.write("First line 1.\n")
f.writelines("First line 2.")
f.close()

f=open(spath,"r") # Opens file for reading
for line in f:
    print line
f.close()
