REM "dbstop.cmd"
@echo off
set ORAHOME="OraDb11g_home1"
set ORASID="ORCL"

rem net stop Oracle%ORAHOME%iSQL*Plus
rem net stop "Oracle ORCL VSS Writer Service"
rem net stop OracleDBConsole%ORASID%
rem net stop OracleJobScheduler%ORASID%
rem net stop OracleMTSRecoveryService
rem net stop Oracle%ORAHOME%ClrAgent
net stop Oracle%ORAHOME%TNSListener
net stop OracleService%ORASID%
@pause
