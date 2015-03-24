#-*- coding: utf-8 -*-
'''
Created on 2013-07-25
@author:lvcn
Usage:
Python Version:2.7.3
'''
word="abcdefg"
print "word is: "+word
a=word[2]
print "word[2] is: "+a
b=word[1:3]
print "word[1:3] is: "+b
c=word[:2]
print "word[:2] is: "+c 
d=word[0:]
print "word[0:] is: "+d 
e=word[:2]+word[2:]
print "word[:2]+word[2:] is: "+e 
f=word[-1]
print "word[-1] is: "+f
g=word[-4:-2]
print "word[-4,-2] is: "+g
h=word[-2:]
print "word[-2:] is: "+h
i=word[:-2]
print "word[:-2] is: "+i 
l=len(word)
print "Length of word is: "+ str(l)
