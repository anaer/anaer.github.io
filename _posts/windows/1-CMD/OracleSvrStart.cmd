REM "dbstart.cmd"
@echo off
set ORAHOME="OraDb11g_home1"
set ORASID="ORCL"

rem net start "Oracle ORCL VSS Writer Service"
rem net start OracleDBConsole%ORASID%
rem net start OracleJobScheduler%ORASID%
rem net start OracleMTSRecoveryService
rem net start Oracle%ORAHOME%ClrAgent
rem 使用plsql dev, 需要下面这个服务
net start Oracle%ORAHOME%TNSListener
net start OracleService%ORASID%


@pause
