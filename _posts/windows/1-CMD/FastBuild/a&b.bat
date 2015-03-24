call SvnUp.bat
set curpath=E:\anaer\note\0-Windows\2-CMD\FastBuild\
cd /d %curpath%
call Run_External.bat
cd /d %curpath%
call Run_Internal.bat

pause