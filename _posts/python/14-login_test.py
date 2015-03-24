#-*- coding: utf-8 -*-
'''
Created on 2013-08-07

@author:lvcn

Usage:扒库测试

Python Version:2.7.3
'''
import urllib2, cookielib
cookie_support= urllib2.HTTPCookieProcessor(cookielib.CookieJar())
opener = urllib2.build_opener(cookie_support, urllib2.HTTPHandler)
urllib2.install_opener(opener)
content = urllib2.urlopen('http://www.baidu.com').read()
print content.decode("utf-8")
