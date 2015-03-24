# 删除temp文件的重复行
	awk '!($0 in array) { array[$0]; print }' temp
