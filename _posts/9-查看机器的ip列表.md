# 查看机器的ip列表
	ifconfig -a | awk '/Bcast/{print $2}' | cut -c 5-19
