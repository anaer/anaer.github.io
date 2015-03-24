# 计算文件temp的第一列的值的和
    awk '{s+=$1}END{print s}' temp

