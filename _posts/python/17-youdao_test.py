#-*- coding: utf-8 -*-
'''
Created on 2013-08-14

@author:lvcn
Usage: py x.py word
       有道字典查询
Python Version:2.7.3
BeautifulSoup Version: 4.3  使用3.x版 执行不成功
'''
from bs4 import BeautifulSoup
from urllib2 import urlopen
import urllib2
import re
import sys

"""
-----------------------------------
get contents
-----------------------------------
"""

def getHtml(htmlurl):
	page = urlopen(urllib2.Request(htmlurl),timeout=10)
	content = page.read()
	page.close()
	return content

"""
----------------------------------
put translations to array
----------------------------------
"""

def getDiv(content):
	soup = BeautifulSoup(content)
#find('div',id='phrsListTab').  .ul 去掉单字与多字差异结构
	getContent = soup.find('div',id='doc').find('div',id='scontainer').find('div',id='container').find('div',id='results').find('div',id='results-contents').find('div',class_='trans-container').strings
	for i in getContent:
		yield i

"""
----------------------------------
print the translations
----------------------------------
"""

def prTrans(arrTrans):
	for i in arrTrans:
		if i.strip()!= "":
			print(i)

"""
----------------------------------
set url
----------------------------------
"""

def urlset():
	lenth = len(sys.argv)
	if lenth == 1:
		print("can't find word!")
		exit()
	else:
		keyword = sys.argv[1:]
		#print keyword
		#空格替换
		keyword = '%20'.join(keyword)
		htmlurl="http://dict.youdao.com/search?le=eng&q=" + keyword + "&keyfrom=dict.index"
		#print htmlurl
		return htmlurl



"""
*********************************
main function
*********************************
"""

if __name__ == "__main__":
	htmlurl = urlset()
	content = getHtml(htmlurl)
	arrTrans = getDiv(content)
	prTrans(arrTrans)

