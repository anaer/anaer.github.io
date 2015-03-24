#-*- encoding:utf-8 -*-
'''
Created on 2013-07-26
@author:lvcn
Usage:sqlite3测试
Python:2.7.3
'''
from datetime import time,datetime,timedelta
import os
import sys
import subprocess
import time as btime

def showGohomeTime():
	#获得现在的时间
    nowtime = datetime.now().time()
	#下班时间,这里设置的是18点0分0秒 三个参数依次是时分秒
    times = time(17,30,0)
    
	#计算
    h=times.hour-nowtime.hour;
    m=abs(times.minute-nowtime.minute);
    s=abs(times.second-nowtime.second);
    
    if m > 0:
        h = h-1;
        m = 60-m;
        s = 60-s;
	#上面这一块就不解释了,而且我发现这一块好像略麻烦了,
	#如果有更好的方式,欢迎指教!
    strtime = "{h}小时{m}分{s}秒".format(h=h,m=m,s=s);
	#这里是为了在windows的命令行下输出的转码，不要问我为什么不直接coding=GBk！
    strtime = strtime.decode('utf-8').encode('gbk')
    print strtime;
    
if __name__ == '__main__':
    while 1==1 :
		#每秒刷新
        os.system("cls")
        showGohomeTime();
        btime.sleep(1);
		#可以直接命令行下python命令执行，效果更佳
		#我顺带写了个批处理
		#就下面这一行
		#call python Lgohome.py
