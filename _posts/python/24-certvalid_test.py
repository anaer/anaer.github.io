#-*- coding: utf-8 -*-
'''
Created on 2013-07-26

@author:lvcn

Usage:邮件测试

Python Version:2.7.3
'''

x_arr = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ] 
y_arr = ['1', '0', 'x', '9', '8', '7', '6', '6', '4', '3', '2'] 

while True: 
    id_card=raw_input('\n请输入身份证号码：').strip() 
    if id_card == 'quit': 
        break 
    elif len(id_card) != 18: 
        print '身份证位数不对' 
        continue 
    a = sum([x*y for x,y in zip(map(int, id_card[:-1]), x_arr)]) 
    if id_card[-1] == str(y_arr[a%11]): 
        print '经计算校验码和实际相同' 
    else: 
        print '计算校验码未通过' 
