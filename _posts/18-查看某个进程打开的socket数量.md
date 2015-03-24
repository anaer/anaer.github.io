# 查看某个进程打开的socket数量
    ps aux | grep [process] | awk '{print $2}' | xargs -I % ls /proc/%/fd | wc -l
