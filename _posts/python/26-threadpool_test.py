#-*- coding: utf-8 -*-
'''
Created on 2013-07-26

@author:lvcn

Usage:

Python Version:2.7.3
'''
import threadpool
import time,random

def hello(str):
    time.sleep(2)
    return str

def print_result(request, result):
    print "the result is %s %r" % (request.requestID, result)

data = [random.randint(1,10) for i in range(20)]

pool = threadpool.ThreadPool(5)
requests = threadpool.makeRequests(hello, data, print_result)
[pool.putRequest(req) for req in requests]
pool.wait()
