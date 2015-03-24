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

#网站拒绝爬虫,需要添加头信息，伪装浏览器
headers = {'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6'}

def readPage(Url):
    request = urllib2.Request(url=Url,headers=headers)
    page = urllib2.urlopen(request).read()
    pageContent = BeautifulSoup(page)
    title = pageContent.find('title').next
    title = title[:title.rindex('-')]
    title = title.strip()
    if pageContent.find('pre'):
        if pageContent.find('pre').get('class'):
            ext = pageContent.find('pre').get('class').split(';')[0].split(':')[1].strip()
            title = title+'.'+ext
            preHandleCode = pageContent.find('pre').next
            title = validate_title(title)
            return createFile('oscode/'+title, safestr(preHandleCode))
        else:
            return False
    else:
        #print 'No code'
        return False

def fetchCode(Url, autoNext):
    print 'Deal Url:', Url
    req = urllib2.Request(url=Url,headers=headers)
    www = urllib2.urlopen(req)
    msg = www.read()

    find=r'(http://www.oschina.net/code/snippet_\d+_\d+)'

    ak=re.findall(find,msg)

    if ak is not None:
        for i in ak:
            readPage(i)

    if autoNext:
        #查询是否存在下一页 如果存在就递归调用
        pageContent = BeautifulSoup(msg)
        title = pageContent.find('li', {'class': 'page next'})
        if title:
            for link in title:
                href = link.get('href')
                global TargetUrl
                NextUrl = TargetUrl+href
                fetchCode(NextUrl, True)

def getAll():
    #Url = 'http://www.oschina.net/code/list/7/python?show=time&p=1'
    global TargetUrl
    TargetUrl = 'http://www.oschina.net/code/list/'
    fetchCode(TargetUrl, True)

if __name__ == '__main__':
    getAll()
