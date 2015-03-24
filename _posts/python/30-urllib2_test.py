#-*- coding: utf-8 -*-
'''
Created on 2013-08-07

@author:lvcn

Usage:

Python Version:2.7.3
'''
import urllib2
from BeautifulSoup import BeautifulSoup

def baidu_func():
    fp = urllib2.urlopen('http://www.baidu.com/s?wd=test')
    content = fp.read()
    print fp.headers #查询网页头信息
    charset = fp.headers.getparam('charset')
    print charset  #查询网页编码
    #print content  #打印网页内容
    #print content.decode("utf-8")  #使用utf-8编码打印网页内容
    
def baidu_func2(content):
    soup = BeautifulSoup(content)
    title = soup.find('title')
    #print title
    print title.contents[0]
    
    
    result = soup.findAll('table',{"class" : "result"})
    #print result
    
    for aa in result:
        bb = aa.find('div',{"class":"c-abstract"})
        #print bb
    
    result1 = soup.findAll('p')
    for a in result1:
        print a.contents[0]

if(__name__ == "__main__"):
    baidu_func()
