; 强制杀死进程, 需要写死进程名, 暂时没什么用
#NoEnv
SendMode Input
SetWorkingDir %A_ScriptDir% ;脚本执行目录
Loop
{
   Process,close,wuauclt.exe
   MsgBox,,,% errorlevel
   If(ErrorLevel==0)
   {
      Break
   }
   Else
   {
      Run, %ComSpec% /c tskill %ErrorLevel%
      Continue
    }

}
