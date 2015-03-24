# 打印文件第一列不同值的行
    awk '!array[$1]++' file.txt

