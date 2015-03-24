# 逆序查看文件
    awk '{a[i++]=$0} END {for (j=i-1; j>=0;) print a[j--] }'
