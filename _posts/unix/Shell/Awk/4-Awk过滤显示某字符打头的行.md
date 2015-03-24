# 过滤显示以version开头的行
	cat desc |awk '/^version/ {print $0}'
