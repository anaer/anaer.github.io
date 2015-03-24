#--*-- coding:UTF-8 --*--
'''
Created on 2013-08-30

@author:lvcn

Usage: 获取博客园首页的博客列表
Python:2.7.3
PyQuery:1.2.4

NOTE: cnblogs_post_body
'''
from pyquery import PyQuery as pq
from mytool import createFile
from mytool import validate_title
from mytool import safe_str

def getContent(link):
    doc=pq(url=r''+link)
    #return doc("#cnblogs_post_body").find("p").text()
    return doc("#cnblogs_post_body").text()

for p in range(1,2):
    doc=pq(url=r'http://www.cnblogs.com/p'+str(p))
    a=doc(".post_item")
    for i in a:
        try:
            title=pq(i).find("h3").text() #,pq(i).find(".post_item_foot").text()
            link = pq(i).find("h3").find("a").attr("href")
            content=getContent(link)
            title=validate_title(title+'.txt')
            createFile('cnblogs/'+title,safe_str(content.encode("utf-8")))
        except Exception,data:
            print Exception,data
            pass
