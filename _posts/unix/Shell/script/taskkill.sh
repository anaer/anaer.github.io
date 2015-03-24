#!/bin/bash
if [[ $USERNAME = "lvcn" ]]
then
    for psname in taskmgr.exe TXPlatform.exe
    do
        pid=`ps -W|grep -i $psname|awk '{print $4}'`
        echo $pid
        for ppid in $pid
        do
            if [[ $ppid > 0 ]]
            then
                tskill $ppid
            fi
        done
    done
fi
