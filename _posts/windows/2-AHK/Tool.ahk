#Persistent     ;让脚本持久地运行 定时器需要

;**************************自定义快捷键****************************
;win+n 记事本
; #n::
; run notepad2                     
; WinWaitActive ahk_class Notepad
; Send time/date:{F5}
; return

;win+c cygwin
#c::run mintty                      

;win+z 静音/恢复
#z::send {Volume_Mute} 

;win+x 退出 zxc 容易误按
;#x::ExitApp 

;******************************已失效******************************
; bing词典已卸载
; #b::run "E:\Program Files\Microsoft Bing Dictionary\BingDict.exe"
;******************************************************************

;******************************自动点击器******************************
; win+t 自动点击器 鼠标当前位置 每隔6秒
flag:=TRUE

#t::
If(flag)
{
    flag:=!flag
    SetTimer, LoopClick, 6000
}
Else
{
    flag:=!flag
    SetTimer, LoopClick, off
}

LoopClick:
MouseClick, left
Return
;******************************************************************

;******************************水平滚动条控制******************************
; Ctrl+鼠标滚轮实现滚动条左右移动
~LControl & WheelUp::  ; 向左滚动。
ControlGetFocus, fcontrol, A
Loop 2  ; <-- 调大这个数值来快速滚动。
    SendMessage, 0x114, 0, 0, %fcontrol%, A  ; 0x114 是 WM_HSCROLL ，它之后的 0 是 SB_LINERIGHT 。
return

~LControl & WheelDown::  ; 向右滚动。
ControlGetFocus, fcontrol, A
Loop 2  ; <-- 调大这个数值来快速滚动。
    SendMessage, 0x114, 1, 0, %fcontrol%, A  ; 0x114 是 WM_HSCROLL ，它之后的 1 是 SB_LINELEFT 。
return
;******************************************************************

;******************************禁止自动屏保******************************
; 禁止屏保 定时鼠标移动下
; 默认 pFlag := False 
#p::
If(!pFlag)
{
    pFlag:=!pFlag
    SetTimer, LoopMouseMove, 60000
    MsgBox, 0, tip, start, 1
}
Else
{
    pFlag:=!pFlag
    SetTimer, LoopMouseMove, off
    MsgBox, 0, tip, stop, 1
}

LoopMouseMove:
MouseGetPos xPos, yPos
MouseMove xPos+1, yPos
MouseMove xPos-1, yPos
Return
;******************************************************************
