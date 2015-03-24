; 为程序添加任务栏图标 需指定程序
; 可替换notepad.exe为其他程序
DetectHiddenWindows On

Menu Tray, Icon, notepad.exe
Menu Tray, NoStandard
Menu Tray, Add, Hide, subShowHide
Menu Tray, Default, Hide
Menu Tray, Add
Menu Tray, Add, Exit, subExit
Menu Tray, Click, ClickCount 1
Menu Tray, Tip, Total Commander

OnExit subExit

bHidden := False

RunWait notepad.exe,,,pidTC
Return

subShowHide:
	if (bHidden)
	{
		WinActivate ahk_pid %pidTC%
		WinShow ahk_pid %pidTC%
		Menu Tray, Rename, Show, Hide
		Menu Tray, Default, Hide
		bHidden := False
	}
	else
	{
		WinHide ahk_pid %pidTC%
		Menu Tray, Rename, Hide, Show
		Menu Tray, Default, Show
		bHidden := True
	}
	Return

subExit:
	WinClose ahk_pid %pidTC%
	ExitApp
