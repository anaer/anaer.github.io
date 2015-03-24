#-*- coding: utf-8 -*-
'''
Created on 2013-08-16

@author:lvcn

Usage: 随机生成大乐透

Python Version:2.7.3
'''
import random

if __name__ == '__main__':
     print (sorted(random.sample(range(1,36),5))+(sorted(random.sample(range(1,13),2))))
