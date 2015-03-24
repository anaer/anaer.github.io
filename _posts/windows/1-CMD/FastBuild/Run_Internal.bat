@echo off
echo 开始编译
SET MSBUILD_EXE=%windir%\microsoft.net\framework\v4.0.30319\msbuild.exe
set buildType=Release
set plat_path=D:\ITA\trunk\Sources\Prog\
set build_path=%plat_path%Hundsun.UI\Hundsun.Framework.Platform\bin\%buildType%\
set slnName=Hundsun_Framework_Solution.sln
set log_path=%USERPROFILE%\Desktop\1build-error.txt

if exist %log_path% (del %log_path% /s /a /f /q)
   
cd /d %plat_path%\Hundsun.UI\Hundsun.Framework.Platform 
xcopy App1.config App.config /y

cd /d %plat_path%   
if exist %build_path% (rd %build_path% /s /q)
%MSBUILD_EXE% %slnName% /t:Rebuild /p:configuration=%buildType%;TargetFrameworkVersion=v4.0   /flp:errorsonly;Logfile=%log_path%;Append=true;Verbsity=diagnostic
cd /d %build_path%
move /Y 管理人客户端.exe  平台客户端.exe
move /Y 管理人客户端.exe.config 平台客户端.exe.config
set n=0
for /f %%i in (%log_path%) do @set/a n=n+1
if "%n%" NEQ "0" (goto error) else (if exist %log_path% (del %log_path% /s /a /f /q))
:error
if exist %log_path% (type %log_path%)