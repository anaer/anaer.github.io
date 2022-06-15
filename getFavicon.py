#!/usr/bin/python
# -*- coding: UTF-8 -*-

import json
import datetime
import os
import re
import requests

outPath = 'favicon/'

def savePoint(url, name):
    try:
        resp = requests.get(url, timeout=1)
        if resp.status_code == 200:
            with open(outPath + name, "wb") as f:
                f.write(resp.content)
    except Exception as e:
        print("请求失败:", url, e)

# 读取文件
json_file = open("json/link.json", 'r', encoding='utf-8', errors='ignore')

json_array = json.loads(json_file.read())

regex = r'(http|https)://([a-zA-Z0-9\.]+)'

for json_obj in json_array:
    for item in json_obj['rows']:
        group = re.search(regex, item)
        httpUrl = group[0]
        domain = group[2]
        if os.path.isfile('favicon/'+domain+'.ico'):
            continue
        # savePoint(httpUrl+'/favicon.ico', domain+'.ico')
        savePoint('https://www.google.com/s2/favicons?domain='+httpUrl, domain+'.ico')
        # savePoint('https://statics.dnspod.cn/proxy_favicon/_/favicon?domain='+domain, domain+'.ico')
