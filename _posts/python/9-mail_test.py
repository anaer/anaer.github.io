#--*-- coding:UTF-8 --*--
'''
Created on 2013-07-26

@author:lvcn

Usage:邮件测试

Python Version:2.7.3
'''
import sys
import smtplib
import socket
from getpass import getpass

if len(sys.argv) < 4:
    print "[*]usage:%s server fromaddr toaddr " % sys.argv[0]
    sys.exit(1)

server = sys.argv[1]
fromaddr = sys.argv[2]
toaddr = sys.argv[3]

message = """
TO: %s
From: %s
Subject: Test Message from SMTP_mail.py

Hello ,This a simple SMTP_mail example.
""" % (toaddr,fromaddr)

def get_size():
    """获得服务器允许发送邮件的大小"""
    try:
        s = smtplib.SMTP(server)     #连接到服务器
        code = s.ehlo()[0]      #返回服务器的特性
        usesesmtp = 1
        if not (200 <= code <=299):         #在200到299之间都是正确的返回值
            usesesntp = 0
            code = s.helo()[0]
            if not (200 <= code <=299):
                raise SMTPHeloError(code,resp)
        if usesesmtp and s.has_extn('size'):         #获得服务器允许发送邮件的大小
            print "Maxinum message size is ",s.esmtp_features['size']
            if len(message) > int(s.esmtp_features['size']):
                print "Message too large;aborting."
                sys.exit(2)
        s.sendmail(fromaddr,toaddr,message)
    except(socket.gaierror,socket.error,socket.herror,smtplib.SMTPException),e:
        print "***Your message may not have been sent!"
        print e
        sys.exit(1)
    else:
        print "***Message successful sent to %d recipient(s)" % len(toaddr)

def ssl_tls():
    """使用SSL安全套阶层和TLS安全传输层进行邮件传输，确保密码在传输中的安全"""
    try:
        s = smtplib.SMTP(server)     #连接到服务器
        code = s.ehlo()[0]      #返回服务器的特性
        usesesmtp = 1
        if not (200 <= code <=299):         #在200到299之间都是正确的返回值
            usesesntp = 0
            code = s.helo()[0]
            if not (200 <= code <=299):
                raise SMTPHeloError(code,resp)
        if usesesmtp and s.has_extn('starttls'):         #查看服务器是否支持TLS
            print "Negotiating TLS......"
            s.starttls()
            code = s.ehlo()[0]
            if not (200 <= code <=299):             #在支持TLS的服务器上是否连接回话成功
                print "Couldn't EHLO after STARTTLS."
                sys.exit(5)
            print "Using TLS connection."
        else:
            print "Server does not suport TLS; using normal connection."
        s.sendmail(fromaddr,toaddr,message)         #如果连接TLS成功则使用加密传输；若连接TLS出错则使用普通的传输
    except(socket.gaierror,socket.error,socket.herror,smtplib.SMTPException),e:
        print "***Your message may not have been sent!"
        print e
        sys.exit(1)
    else:
        print "***Message successful sent to %d recipient(s)" % len(toaddr)

def auth_login():
    """当发送邮件时，服务器需要验证，则输入用户名密码方可发送邮件"""
    sys.stdout.write("Enter username: ")
    username = sys.stdin.readline().strip()
    password = getpass("Enter password: ")
    try:
        s = smtplib.SMTP(server)     #连接到服务器
        code = s.ehlo()[0]      #返回服务器的特性
        usesesmtp = 1
        if not (200 <= code <=299):         #在200到299之间都是正确的返回值
            usesesntp = 0
            code = s.helo()[0]
            if not (200 <= code <=299):
                raise SMTPHeloError(code,resp)
        if usesesmtp and s.has_extn('auth'):         #查看服务器是否支持认证
            print "Using Authentication connect."
            try:
                s.login(username,password)
            except smtplib.SMTPException,e:
                print "Authentication failed:",e
                sys.exit(1)
        else:
            print "Server does not suport Authentication; using normal connect."
        s.sendmail(fromaddr,toaddr,message)         #如果支持认证则输入用户名密码进行认证；不支持则使用普通形式进行传输
    except(socket.gaierror,socket.error,socket.herror,smtplib.SMTPException),e:
        print "***Your message may not have been sent!"
        print e
        sys.exit(1)
    else:
        print "***Message successful sent to %d recipient(s)" % len(toaddr)

if __name__ == "__main__":
    #get_size()
    #ssl_tls()
    auth_login()
