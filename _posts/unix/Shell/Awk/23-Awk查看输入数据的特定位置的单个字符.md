# 查看输入数据的特定位置的单个字符
    echo "abcdefg"|awk 'BEGIN {FS="''"} {print $2}'

    ls | awk '{print NR "\t" $0}'
