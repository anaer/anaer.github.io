#-*- coding: utf-8 -*-
'''
Created on 2013-08-14

@author:lvcn

Usage: 获取bing壁纸

Python Version:2.7.3
'''
import os
import sys
import random
import urllib
import Image

class StealBing:

    def __init__(self):
        self.content = urllib.urlopen('http://cn.bing.com/').read()
        self.bgImageUrl = ''

    def parserImageURL(self):
        tempStr = self.content[self.content.index('g_img={url:')+12:len(self.content)]
        tempStr = tempStr[0:tempStr.index(',id:')-1]
        tempStr = tempStr.replace('\\', '')
        self.bgImageUrl = tempStr

    def downloadImage(self):
        if self.bgImageUrl == '':
            self.parserImageURL()

        print self.bgImageUrl
        filename = self.bgImageUrl[self.bgImageUrl.rindex('/')+1:]
        data = urllib.urlretrieve(self.bgImageUrl, filename)

if __name__ == '__main__':
    stealBing = StealBing()
    stealBing.downloadImage()


