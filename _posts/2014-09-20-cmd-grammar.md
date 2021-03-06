---
layout: post
title: "批处理命令cmd"
description: ""
category:CMD
tags: [CMD]

---

#### BAT中ifelse判断

  ```cmd
  @echo off
  :start
  set /p first="请选择,输入1运行1号程序,输入2运行2号程序:"
  if %first% LEQ 2 (
	goto first
  ) else (
	echo 输入错误!请重新输入！
	goto start
  )
  :first
	IF %first% == 1 goto one ELSE goto two
	exit
  :one
	rem 这里是你要执行的第一个程序
	exit
  :two
	rem 这里是你要执行的第二个程序
	exit

  照刚才上面的程序，还可以将另一条IF语句加入到第一条中
  变化如下
  @echo off
  :start
  set /p first="请选择,输入1运行1号程序,输入2运行2号程序:"
  if %first% LEQ 2 (
	IF %first% == 1 (
		rem 这里是你要执行的第一个程序
	exit
  ) ELSE (
		rem 这里是你要执行的第二个程序
	exit
  )
  ) else (
	echo 输入错误!请重新输入！
	goto start
  )
  pause
  ```

#### CMD组合命令和管道命令的使用

1.&
Usage：第一条命令 & 第二条命令 [& 第三条命令...]
用这种方法可以同时执行多条命令，而不管命令是否执行成功
2.&&
Usage：第一条命令 && 第二条命令 [&& 第三条命令...]
用这种方法可以同时执行多条命令，当碰到执行出错的命令后将不执行后面的命令，如果一直没有出错则
一直执行完所有命令；

3.||
Usage：第一条命令 || 第二条命令 [|| 第三条命令...]
用这种方法可以同时执行多条命令，当碰到执行正确的命令后将不执行后面的命令，如果没有出现正确的
命令则一直执行完所有命令；

1.| 命令
Usage：第一条命令 | 第二条命令 [| 第三条命令...]
将第一条命令的结果作为第二条命令的参数来使用，记得在unix中这种方式很常见。

2.>,>>输出重定向命令
将一条命令或某个程序输出结果的重定向到特定文件中, > 与 >>的区别在于，>会清除调原有文件中的内
容后写入指定文件，而>>只会追加内容到指定文件中，而不会改动其中的内容。

3.< , >& , <&
< 从文件中而不是从键盘中读入命令输入。
>& 将一个句柄的输出写入到另一个句柄的输入中。
<& 从一个句柄读取输入并将其写入到另一个句柄输出中。

使用命令重定向操作符可以使用重定向操作符将命令输入和输出数据流从默认位置重定向到其他位置。输入或输出数据流的位置称为句柄。

下表将列出可用的句柄。
句柄       句柄的数字代号描述
STDIN     0 键盘输入
STDOUT    1 输出到命令提示符窗口
STDERR    2 错误输出到命令提示符窗口
UNDEFINED 3-9 句柄由应用程序单独定义，它们是各个工具特有的

变量	类型	描述
%ALLUSERSPROFILE%
局部
返回“所有用户配置文件”的位置。
%APPDATA%
局部
返回默认情况下应用程序存储数据的位置。
%CD%
局部
返回当前目录字符串。
%CMDCMDLINE%
局部
返回用来启动当前的 Cmd.exe 的准确命令行。
%CMDEXTVERSION%
系统
返回当前的“命令处理程序扩展”的版本号。
%COMPUTERNAME%
系统
返回计算机的名称。
%COMSPEC%
系统
返回命令行解释器可执行程序的准确路径。
%DATE%
系统
返回当前日期。使用与date /t命令相同的格式。由 Cmd.exe 生成。有关 date 命令的详细信息，请参阅 Date。
%ERRORLEVEL%
系统
返回上一条命令的错误代码。通常用非零值表示错误。
%HOMEDRIVE%
系统
返回连接到用户主目录的本地工作站驱动器号。基于主目录值而设置。用户主目录是在“本地用户和组”中指定的。
%HOMEPATH%
系统
返回用户主目录的完整路径。基于主目录值而设置。用户主目录是在“本地用户和组”中指定的。
%HOMESHARE%
系统
返回用户的共享主目录的网络路径。基于主目录值而设置。用户主目录是在“本地用户和组”中指定的。
%LOGONSERVER%
局部
返回验证当前登录会话的域控制器的名称。
%NUMBER_OF_PROCESSORS%
系统
指定安装在计算机上的处理器的数目。
%OS%
系统
返回操作系统名称。Windows 2000 会将该操作系统显示为 Windows NT。
%PATH%
系统
指定可执行文件的搜索路径。
%PATHEXT%
系统
返回操作系统认为可执行的文件扩展名的列表。
%PROCESSOR_ARCHITECTURE%
系统
返回处理器的芯片体系结构。值：x86 或 IA64（基于 Itanium）。
%PROCESSOR_IDENTFIER%
系统
返回处理器说明。
%PROCESSOR_LEVEL%
系统
返回计算机上安装的处理器的型号。
%PROCESSOR_REVISION%
系统
返回处理器的版本号。
%PROMPT%
局部
返回当前解释程序的命令提示符设置。由 Cmd.exe 生成。
%RANDOM%
系统
返回 0 到 32767 之间的任意十进制数字。由 Cmd.exe 生成。
%SYSTEMDRIVE%
系统
返回包含 Windows 服务器操作系统根目录（即系统根目录）的驱动器。
%SYSTEMROOT%
系统
返回 Windows 服务器操作系统目录的位置。
%TEMP% 和 %TMP%
系统和用户
返回对当前登录用户可用的应用程序所使用的默认临时目录。有些应用程序需要 TEMP，而其他应用程序则需要 TMP。
%TIME%
系统
返回当前时间。使用与 time /t 命令相同的格式。由 Cmd.exe 生成。有关 time 命令的详细信息，请参阅 Time。
%USERDOMAIN%
局部
返回包含用户帐户的域的名称。
%USERNAME%
局部
返回当前登录的用户的名称。
%USERPROFILE%
局部
返回当前用户的配置文件的位置。
%WINDIR%
系统
返回操作系统目录的位置。

#### 运维常用命令
  * 查询端口对应程序PID

```
@echo off
set PortNum=3306
for /f "tokens=15" %%a in ('ipconfig^|findstr /i /c:"IP Address"') do (
  set IP=%%a
)
for /f "tokens=5" %%a in ('netstat -ano^|findstr "%IP%:%PortNum%"') do (
  set PID=%%a
)
echo 端口号%PortNum%对应的PID是：%PID%
pause
```

* 通过端口查询进程

```bat
> netstat -ano|findstr 3306
> tasklist /fi "PID eq 5956" /M
> tasklist /fi "IMAGENAME eq mysqld.exe"
```

#### 删除服务
`sc delete 服务名`
