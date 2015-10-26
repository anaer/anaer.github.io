---
layout: post
title: "nbtstat及netstat命令---查对方IP mac地址 根据IP查对方计算机名"
description: "nbtstat及netstat命令---查对方IP mac地址 根据IP查对方计算机名"
category: windows
tags: [windows]
---

知道ip，想知道是谁的主机（主机的计算机名是实名制）。
    nbtstat -A 192.168.1.20  注意：参数A为大写，是根据ip查计算机名。小写a，是根据计算机名查ip
    nbtstat -a  王五

知道ip地址，想知道其mac地址
    arp -a 192.168.1.20


nbtstat

　　NBTSTAT命令:用于查看当前基于NETBIOS的TCP/IP连接状态，通过该工 具你可以获得远程或本地机器的组名和机器名。虽然用户使用ipconfig/winipcfg工具可以准确地得到主机的网卡地址，但对于一个已建成的比较 大型的局域网，要去每台机器上进行这样的操作就显得过于费事了。网管人员通过在自己上网的机器上使用DOS命令nbtstat，可以获取另一台上网主机的 网卡地址。我们还是先来看看它的语法格式吧：

　　NBTSTAT [ [-a RemoteName] [-A IP address] [-c] [-n] [-r] [-R] [-RR] [-s] [-S] [interval] ]

　　参数说明：

　　-a Remotename—说明使用远程计算机的名称列出其名称表，此参数可以通过远程计算机的NetBios名来查看他的当前状态。

　　-A IP address—说明使用远程计算机的 IP 地址并列出名称表，这个和-a不同的是就是这个只能使用IP，其实-a就包括了-A的功能了。

　　-c—列出远程计算机的NetBIOS 名称的缓存和每个名称的 IP 地址 这个参数就是用来列出在你的NetBIOS里缓存的你连接过的计算机的IP。

　　-n—列出本地机的 NetBIOS 名称，此参数与上面所介绍的一个工具软件“netstat”中加“ -a”参数功能类似，只是这个是检查本地的，如果把netstat -a后面的IP换为自己的就和nbtstat -n的效果是一样的了。

　　-r—列出 Windows 网络名称解析的名称解析统计。在配置使用 WINS 的 Windows 2000 计算机上，此选项返回要通过广播或 WINS 来解析和注册的名称数。

　　-R—清除 NetBIOS 名称缓存中的所有名称后，重新装入 Lmhosts 文件，这个参数就是清除nbtstat -c所能看见的缓存里的IP。

　　-S—在客户端和服务器会话表中只显示远程计算机的IP地址。

　　-s—显示客户端和服务器会话，并将远程计算机 IP 地址转换成NETBIOS名称。此参数和-S差不多，只是这个会把对方的NetBIOS名给解析出来。

　　-RR—释放在 WINS 服务器上注册的 NetBIOS 名称，然后刷新它们的注册。

　　interval—每隔interval 秒重新显示所选的统计，直到按“CTRL+C”键停止重新显示统计。如果省略该参数，nbtstat 将打印一次当前的配置信息。此参数和netstat的一样，nbtstat中的“interval”参数是配合-s和-S一起使用的。

netstat

    netstat –s本选项能够按照各个协议分别显示其统计数据。如果我们的应用程序（如Web浏览器）运行速度比较慢，或者不能显示Web页之类的数据，那么我们就可以 用本选项来查看一下所显示的信息。我们需要仔细查看统计数据的各行，找到出错的关键字，进而确定问题所在。

　　netstat –e本选项用于显示关于以太网的统计数据。它列出的项目包括传送的数据报的总字节数、错误数、删除数、数据报的数量和广播的数量。这些统计数据既有发送的数据报数量，也有接收的数据报数量。这个选项可以用来统计一些基本的网络流量）。

　　netstat –r本选项可以显示关于路由表的信息，类似于后面所讲使用route print命令时看到的 信息。除了显示有效路由外，还显示当前有效的连接。

　　netstat –a本选项显示一个所有的有效连接信息列表，包括已建立的连接（ESTABLISHED），也包括监听连接请求（LISTENING）的那些连接。

　　netstat –n显示所有已建立的有效连接。

Netstat 查看对方IP地址

　　经常上网的人一般都使用ICQ的，不知道我们有没有被一些讨厌的人骚扰，想投诉却又不知 从和下手？其实，我们只要知道对方的IP，就可以向他所属的ISP投诉了。但怎样才能通过ICQ知道对方的IP呢？如果对方在设置ICQ时选择了不显示 IP地址，那我们是无法在信息栏中看到的。其实，我们只需要通过Netstat就可以很方便的做到这一点：当他通过ICQ或其他的工具与我们相连时（例如 我们给他发一条ICQ信息或他给我们发一条信息），我们立刻在DOS 命令提示符下输入netstat -n或netstat -a就可以看到对方上网时所用的IP或ISP域名了，甚至连所用Port都完全暴露了。

* [nbtstat及netstat命令---查对方IP mac地址 根据IP查对方计算机名](http://www.5x54.com/article/html/201006/27182502.html)

