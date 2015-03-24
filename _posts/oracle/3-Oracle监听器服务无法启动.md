在本地计算机无法启动OracleOraHome92TNSListener服务，错误3，系统找不到指定路径
进入注册表,
HKEY_LOCAL_MACHINE/SYSTEM/CurrentControlSet/Services/OracleOraHome92TNSListener,查看是否存在ImagePa
th关键值,如果没有,新建它.类型是可扩充字符串值,他的值(我机器)为: "D:/oracle/ora92/bin/TNSLSNR.EXE"
