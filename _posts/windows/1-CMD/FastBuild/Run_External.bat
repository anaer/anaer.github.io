@echo off
echo ¿ªÊ¼±àÒë
SET MSBUILD_EXE=%windir%\microsoft.net\framework\v4.0.30319\msbuild.exe 
set buildType=Debug
set slnName=Hundsun_Client_Solution.sln
set plat_path=D:\ITA\trunk\Sources\Prog
set build_path=%plat_path%Hundsun.UI\Hundsun.Framework.Platform\bin\%buildType%\
set log_path=%USERPROFILE%\Desktop\0build-error.txt

if exist %log_path% (del %log_path% /s /a /f /q)
   
cd /d %plat_path%\Hundsun.UI\Hundsun.Framework.Platform 
xcopy App0.config App.config /y

cd /d %plat_path%   
if exist %build_path% (rd %build_path% /s /q)
%MSBUILD_EXE% %slnName% /t:Rebuild /p:configuration=%buildType%;TargetFrameworkVersion=v4.0  /flp:errorsonly;Logfile=%log_path%;Append=true;Verbsity=diagnostic
set n=0
for /f %%i in (%log_path%) do @set/a n=n+1
if "%n%" NEQ "0" (goto error) else (if exist %log_path% (del %log_path% /s /a /f /q))
:error
if exist %log_path% (type %log_path%)