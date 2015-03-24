REM 支付宝
net stop AlipaySecSvc
sc config AlipaySecSvc start= disabled
REM 自动更新
net stop wuauserv
sc config wuauserv start= disabled
REM 主题
net stop Themes
sc config Themes start= disabled
@pause
