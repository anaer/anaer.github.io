set mydate=%date:~0,4%%date:~5,2%%date:~8,2%
exp scott/tiger@orcl file=orabak/%mydate%.dmp log=orabak/%mydate%.log 
