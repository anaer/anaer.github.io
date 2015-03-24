#-*- coding: utf-8 -*-
'''
Created on 2013-08-19
@author:lvcn
Usage: 工具类
Python Version:2.7.3
'''

import os
import re

'''
Desc: 创建文件
Param: title - 文件标题, 可带路径
       content - 文件内容
'''
def createFile(title, content):
    if os.path.exists(title):
        return False
    filepath = os.path.dirname(title)
    if not os.path.exists(filepath):
        os.makedirs(filepath)
    f=open(title,"w")
    f.writelines(content)
    f.close()
    return True

'''
Desc: 校验文件名是否有效
Param: filename-文件名
return: 是否有效
'''
def checkFileNameValid(filename):
    aset = ['/','\\','<','>','|',':','?','*','"']
    return not containAny(filename, aset)

'''
Desc: 检测字符串中是否包含某字符集合中的字符
Param: seq-字符串 aset-字符集合
'''
def containAny(seq,aset):
    for c in seq:
         if c in aset:
                return True
    return False

'''
Desc: 校验文件名是否有效 正则版
      如果包含特殊字符 则自动删除
Param: title 文件名
return: 返回转换后的文件名
'''
def validate_title(title):
    rstr = r"[\/\\\:\*\?\"\<\>\|]"
    new_title = re.sub(rstr, "", title)
    return new_title
def safe_unicode(obj, * args):
    """ return the unicode representation of obj """
    try:
        return unicode(obj, * args)
    except UnicodeDecodeError:
        # obj is byte string
        ascii_text = str(obj).encode('string_escape')
        return unicode(ascii_text)
def safe_str(obj):
    """ return the byte string representation of obj """
    try:
        return str(obj)
    except UnicodeEncodeError:
        # obj is unicode
        return unicode(obj).encode('unicode_escape')
def safeunicode(obj, encoding='utf-8'):
    r"""
    Converts any given object to unicode string.
        >>> safeunicode('hello')
        u'hello'
        >>> safeunicode(2)
        u'2'
        >>> safeunicode('\xe1\x88\xb4')
        u'\u1234'
    """
    t = type(obj)
    if t is unicode:
        return obj
    elif t is str:
        return obj.decode(encoding)
    elif t in [int, float, bool]:
        return unicode(obj)
    elif hasattr(obj, '__unicode__') or isinstance(obj, unicode):
        return unicode(obj)
    else:
        return str(obj).decode(encoding)
def safestr(obj, encoding='utf-8'):
    r"""
    Converts any given object to utf-8 encoded string.
        >>> safestr('hello')
        'hello'
        >>> safestr(u'\u1234')
        '\xe1\x88\xb4'
        >>> safestr(2)
        '2'
    """
    if isinstance(obj, unicode):
        return obj.encode(encoding)
    elif isinstance(obj, str):
        return obj
    #elif hasattr(obj, 'next'): # iterator
    #    return itertools.imap(safestr, obj)
    else:
        return str(obj)
'''
将&lt; &gt; 转换为 < >
仅列出常用的几个转换
全部列表见:http://www.cnblogs.com/huazai/archive/2008/11/25/1340863.html
搜索关键字:HTML特殊转义字符对照表
使用Py3: html.parser
    Py2: HTMLParser
def convert(data):
    data=data.replace('&lt;','<')
    data=data.replace('&gt;','>')
    data=data.replace('&amp;','&')
    data=data.replace('&nbsp;',' ')
    data=data.replace('&quot;','"')
    return data
'''
