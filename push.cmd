@echo off
chcp 65001
rem 因为github 偶尔会请求失败, 所以循环执行, 直到成功
for /l %%a in (0,0,1) do (git push && exit; sleep 3)