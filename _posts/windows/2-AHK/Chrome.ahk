;为Chrome浏览器 添加快捷键
#IfWinActive, ahk_class Chrome_WidgetWin_1
F1::Send ^t		;打开新的标签
F2::Send ^+{Tab}	;移到左边的标签页
F3::Send ^{Tab}		;移到右边的标签页
F4::Send ^w		;关闭标签

^b::Send ^+b
!1::Send ^1
!2::Send ^2
!3::Send ^3
!4::Send ^4
!5::Send ^5
!6::Send ^6
!7::Send ^7
!8::Send ^8
!9::Send ^9
;!1::run,chrome://settings/extensionSettings
