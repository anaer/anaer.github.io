#-*- coding: utf-8 -*-
'''
Created on 2013-07-25 
@author:lvcn
Usage:函数测试
Python Version:2.7.3
'''
# Define and invoke function.
print '#定义了求和方法sum(a,b)'
def sum(a,b):
    return a+b
func = sum
r = func(5,6)
print 'func(5,6)=',r

print '#定义了求和方法add(a,b=2)'
def add(a,b=2):
    return a+b
r=add(1)
print 'add(1)=',r
r=add(1,5)
print 'add(1,5)=',r
