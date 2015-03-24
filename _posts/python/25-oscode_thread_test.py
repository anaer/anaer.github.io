#-*- coding: utf-8 -*-
'''
Created on 2013-08-14
@author:lvcn
Usage: oschina python top code download
Python Version:2.7.3
'''
import re
import urllib2
from BeautifulSoup import BeautifulSoup
from mytool import createFile
from mytool import safe_str
from mytool import safestr
from mytool import validate_title
#from mytool import convert
import threading
import threadpool
import socket
import HTMLParser
import logging
import logging.config
import os
logging.config.fileConfig(os.path.abspath(os.path.dirname(__file__)) + "/logger.conf")
#网站拒绝爬虫,需要添加头信息，伪装浏览器
headers = {'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6'}
extDict = {'python':'py','bash':'sh'}
def ReadPage(Url):
        logging.info(Url)
        request = urllib2.Request(url=Url,headers=headers)
        page = urllib2.urlopen(request).read()
        pageContent = BeautifulSoup(page)
        title = pageContent.find('title').next
        title = title[:title.rindex('-')]
        title = title.strip()
        try:
            ext = pageContent.find('pre').get('class').split(';')[0].split(':')[1].strip()
            if extDict.has_key(ext) :
              ext = extDict[ext]
            title = title+'.'+ext
            print title
            preHandleCode = pageContent.find('pre').next
            title = validate_title(title)
            content = safestr(preHandleCode)
            #content = convert(content)
            content = HTMLParser.HTMLParser().unescape(content)
            content = content + '\n//' + Url;
            return createFile('oscode/'+ext+'/'+title, content)
        except Exception:
            return False
def fetchPage(TargetUrl):
        #print 'Deal Url:', TargetUrl
        logging.info('Deal Url: %s', TargetUrl)
        req = urllib2.Request(url=TargetUrl,headers=headers)
        www = urllib2.urlopen(req)
        msg = www.read()
        find=r'(http://www.oschina.net/code/snippet_\d+_\d+)'
        ak=re.findall(find,msg)
        if ak:
            for i in ak:
                ReadPage(i)
def print_result(request, result):
    #print "**** Result from request #%s: %r" % (request.requestID, result)
    logging.info("**** Result from request #%s: %r" % (request.requestID, result))
def getAll():
    #PreUrl = 'http://www.oschina.net/code/list'
    PreUrl = 'http://www.oschina.net/code/list?lang=Shell&catalog=&show=time&sort=&p='
    data = [PreUrl+str(i) for i in range(1,10)]
    pool = threadpool.ThreadPool(10)
    requests = threadpool.makeRequests(fetchPage, data, print_result)
    [pool.putRequest(req) for req in requests]
    pool.wait()
if __name__ == '__main__':
    logging.warning('__main__')
    getAll()
