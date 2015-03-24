#-*- coding: utf-8 -*-
'''
Created on 2013-07-25
@Author:lvcn
Usage:
Python Version:2.7.3
'''
x=int(raw_input("Please enter an integer:"))
if x<0:
    x=0
    print "Negative changed to zero"
elif x==0:
    print "Zero"
else:
    print "More"

a = ['cat', 'window', 'defenestrate']
for x in a:
    print x, len(x)
